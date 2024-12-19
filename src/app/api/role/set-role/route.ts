import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Role from "@/models/Role";

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        {
          status: "error",
          message: "Email and role are required.",
        },
        { status: 400 }
      );
    }

    const validRoles = ['admin', 'worker', 'user'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        {
          status: "error",
          message: `Invalid role. Valid roles are: ${validRoles.join(', ')}`,
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if the role for this email already exists
    const existingRole = await Role.findOne({ email });

    if (existingRole) {
      // Update the role if it already exists
      existingRole.role = role;
      await existingRole.save();
      return NextResponse.json(
        {
          status: "success",
          message: "Role updated successfully.",
        },
        { status: 200 }
      );
    }

    // Create a new role if it doesn't exist
    const newRole = new Role({ email, role });
    await newRole.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Role added successfully.",
      },
      { status: 201 }
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

