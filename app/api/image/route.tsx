import { ImageResponse } from 'next/og'


export async function GET(request: Request) {
  // get text from query string
  const { searchParams } = new URL(request.url);
  const hasText = searchParams.has("text");
  const text = hasText ? searchParams.get("text") : "No text...";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 42,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          padding: "50px 100px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            gap: 0,
            wordBreak: "break-word",
          }}
        >
          <p>{text}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}