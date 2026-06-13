import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f17",
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99, 102, 241, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "60px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#e6edf6",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Wahidullah Shadab
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "#94a3b8",
              fontWeight: "500",
            }}
          >
            Full-Stack Developer
          </p>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                borderRadius: "12px",
                color: "#818cf8",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              React
            </div>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                borderRadius: "12px",
                color: "#818cf8",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Next.js
            </div>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                borderRadius: "12px",
                color: "#818cf8",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              TypeScript
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
