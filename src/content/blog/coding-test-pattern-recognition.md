---
title: "You don’t have a coding problem, you have a pattern problem"
description: "Grinding hundreds of problems and still failing timed assessments is a recognizable failure mode. Here’s what’s actually going wrong."
date: "2026-07-22"
category: "Coding Tests"
author: "Upveraoffer"
cover: "/images/blog/coding-test.jpg"
coverAlt: "A computer screen filled with lines of source code"
coverCredit: "Chris Ried"
coverCreditUrl: "https://unsplash.com/@cdr6934"
---

Here’s a story we hear most weeks. Someone has solved three hundred problems. They can explain binary search in their sleep. They sit a sixty-minute assessment, read problem one, and their mind goes completely flat.

That’s almost never a knowledge gap. It’s a **retrieval** gap.

## Solving isn’t the same as recognizing

When you work through a curated list, the problem comes pre-labeled. You’re on the dynamic programming page, so you reach for dynamic programming. You solve it. You feel competent.

In a real assessment nothing is labeled. The entire first step, working out *which* tool this is, has been quietly removed from your practice. And it’s the step the clock punishes hardest.

## The two-minute test

Take a problem you haven’t seen. Set a timer for two minutes. Don’t write any code. Just write down:

- What shape is the input, and what shape is the output?
- What’s the brute-force approach, and what does it cost?
- What structure in the input might let me do better? Sortedness, bounds, uniqueness, adjacency?
- Which pattern does that structure point at?

If you can’t answer those in two minutes, more problems won’t help you. You need to practice *the two minutes*, not the sixty.

## The patterns that actually recur

Assessments pull from a much smaller pool than problem sites make it look:

| What you see in the problem | What to reach for |
|---|---|
| Sorted array, find a pair or triple | Two pointers |
| Contiguous subarray or substring | Sliding window |
| "Top k" or "k largest" | Heap |
| Grid, maze, shortest unweighted path | BFS |
| Explore all paths, backtrack on failure | DFS / backtracking |
| Overlapping subproblems | Dynamic programming |
| Prefix sums, range queries | Cumulative arrays |
| Connectivity, grouping | Union-find |

Eight rows. Most assessments come out of them. The work isn’t learning more rows, it’s learning to see the left column fast.

## How to practice retrieval

Change one thing: **shuffle**. Build a mixed pool of problems from every category, draw at random, and start the two-minute clock before you write anything. Log which pattern you named and whether you were right.

Your error log is your curriculum. The patterns you keep misnaming are the ones costing you the assessment, not the ones you’ve never studied.

## Finishing inside the limit

Recognition buys you time. It doesn’t spend it well. Two habits close that gap:

- **Write the signature and the brute force first.** A working slow solution beats an unfinished fast one, and it usually shows you the optimization anyway.
- **Handle edge cases before you optimize.** Empty input, single element, duplicates, negatives. Assessments weight correctness far above elegance.
