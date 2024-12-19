import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";

export async function PUT(req: Request) {
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

    const { name, email, phone } = await req.json();

    await connectToDatabase();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    return NextResponse.json(
      {
        status: "success",
        message: "User updated successfully!",
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
      { status: 500 });
  }
}
