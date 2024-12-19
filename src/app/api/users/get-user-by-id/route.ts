import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "User ID is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(id).populate("tasks");

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: (error as { message: string }).message || "Internal server error.",
      },
      { status: 500 }
    );
  }
}
