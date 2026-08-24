#!/usr/bin/env node
/**
 * Language guard.
 *
 * This project is English-only: source, content, filenames, and commit
 * history. This script proves that mechanically instead of trusting a
 * manual read, and CI runs it on every push so it can never regress.
 *
 *   npm run check:lang          scan tracked files and filenames
 *   npm run check:lang -- --all also scan every commit message and every
 *                               historical version of every file
 *
 * Exits non-zero and prints file, line, and the offending text if anything
 * is found.
 *
 * Note: run this rather than grep. Git Bash on Windows uses a non-UTF-8
 * locale, so `grep "[<hangul range>]"` matches byte-wise and reports false
 * positives on essentially any file, including binaries.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

/**
 * Scripts that should never appear. Hangul first, then other CJK.
 *
 * The ranges are written as \u escapes rather than literal characters on
 * purpose: this file has to stay pure ASCII, or the checker matches its own
 * source and fails every run. Do not "tidy" these into literals.
 */
const BLOCKED = [
  { name: "Hangul syllables", re: /[\uAC00-\uD7A3]/u },
  { name: "Hangul Jamo", re: /[\u1100-\u11FF\uA960-\uA97F\uD7B0-\uD7FF]/u },
  { name: "Hangul compatibility Jamo", re: /[\u3130-\u318F]/u },
  { name: "Halfwidth Hangul", re: /[\uFFA0-\uFFDC]/u },
  { name: "CJK ideographs", re: /[\u4E00-\u9FFF\u3400-\u4DBF]/u },
  { name: "Hiragana or Katakana", re: /[\u3040-\u30FF]/u },
];

/** Binary files have no language to check and produce garbage matches. */
const BINARY = /\.(jpe?g|png|gif|webp|avif|ico|icns|woff2?|ttf|otf|eot|pdf|zip|gz|mp4|webm|mp3|wav)$/i;

const MAX_BYTES = 2_000_000;

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function scan(text, label, findings) {
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const { name, re } of BLOCKED) {
      if (re.test(lines[i])) {
        findings.push({
          label,
          line: i + 1,
          script: name,
          text: lines[i].trim().slice(0, 120),
        });
        break; // one report per line is enough
      }
    }
  }
}

function checkTrackedFiles(findings) {
  const files = git(["ls-files"]).split("\n").filter(Boolean);
  let scanned = 0;

  for (const file of files) {
    // Filenames themselves must be clean too.
    for (const { name, re } of BLOCKED) {
      if (re.test(file)) {
        findings.push({ label: `filename: ${file}`, line: 0, script: name, text: file });
        break;
      }
    }

    if (BINARY.test(file)) continue;
    let size;
    try {
      size = statSync(file).size;
    } catch {
      continue; // deleted but still indexed
    }
    if (size === 0 || size > MAX_BYTES) continue;

    scan(readFileSync(file, "utf8"), file, findings);
    scanned++;
  }
  return { total: files.length, scanned };
}

/**
 * Project history means branches, tags and remotes.
 *
 * Deliberately NOT --all. That would also walk refs written by local tooling,
 * such as editor checkpoint refs under refs/codex/ and the filter-branch
 * backup at refs/original/. Those snapshot the working tree (including
 * untracked scratch files), never reach the remote, and are not history
 * anyone else will ever see.
 */
const HISTORY_REFS = ["--branches", "--tags", "--remotes"];

function checkHistory(findings) {
  // Commit messages, author names, author emails.
  const log = git(["log", ...HISTORY_REFS, "--pretty=format:%H%n%an%n%ae%n%s%n%b%n--"]);
  scan(log, "git commit metadata", findings);

  // Every version of every file ever committed.
  const objects = git(["rev-list", "--objects", ...HISTORY_REFS])
    .split("\n")
    .filter(Boolean);
  let blobs = 0;

  for (const entry of objects) {
    const sp = entry.indexOf(" ");
    if (sp === -1) continue; // commit or tree, not a blob with a path
    const sha = entry.slice(0, sp);
    const path = entry.slice(sp + 1);
    if (BINARY.test(path)) continue;

    let type;
    try {
      type = git(["cat-file", "-t", sha]).trim();
    } catch {
      continue;
    }
    if (type !== "blob") continue;

    const size = Number(git(["cat-file", "-s", sha]).trim());
    if (!size || size > MAX_BYTES) continue;

    scan(git(["cat-file", "-p", sha]), `history: ${path} @ ${sha.slice(0, 8)}`, findings);
    blobs++;
  }
  return blobs;
}

const deep = process.argv.includes("--all");
const findings = [];

const { total, scanned } = checkTrackedFiles(findings);
let blobs = 0;
if (deep) blobs = checkHistory(findings);

if (findings.length > 0) {
  console.error(`\nLanguage check FAILED: ${findings.length} occurrence(s)\n`);
  for (const f of findings) {
    console.error(`  ${f.label}${f.line ? `:${f.line}` : ""}`);
    console.error(`    ${f.script}: ${f.text}\n`);
  }
  console.error("This project is English-only. Replace the text above.\n");
  process.exit(1);
}

console.log(
  `Language check passed. ${scanned} of ${total} tracked files scanned ` +
    `(binaries skipped)${deep ? `, plus ${blobs} historical blobs and all commit messages` : ""}.`,
);
