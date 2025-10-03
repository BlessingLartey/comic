import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(
      "https://training.thecosmicelectronics.com/wp-json/wp/v2/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          title: body.title || "My API Post",
          content: body.content || "This post was created via fetch!",
          status: body.status || "publish",
        }),
      }
    );

    const responseData = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: responseData.message || "Failed to create post" },
        { status: res.status }
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
