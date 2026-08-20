import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social sharing card, generated at build time. Kept to system fonts and
 * flat shapes so it renders identically everywhere and needs no assets.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14112e",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#5b45e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            ↗
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#efedfa" }}>
            Upveraoffer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            From resume to offer.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#a49ecb",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Resume writing, interview preparation, and coding test coaching —
            the whole job search, handled.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 6, borderRadius: 3, background: "#38e8ac" }} />
          <div style={{ fontSize: 26, color: "#837cae" }}>upveraoffer.com</div>
        </div>
      </div>
    ),
    size,
  );
}
