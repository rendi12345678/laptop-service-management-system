import { connectToDatabase } from "@/lib/dbConnect";
import Task from "@/models/Task";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("taskId");

    if (!taskId) {
      return new Response(
        JSON.stringify({ status: "error", message: "Task ID is required" }),
        { status: 400 }
      );
    }

    // Get user session to check authentication
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new Response(
        JSON.stringify({ status: "error", message: "User not authenticated" }),
        { status: 401 }
      );
    }

    const userRole = user.role;

    if (userRole !== "admin") {
      return new Response(
        JSON.stringify({ status: "error", message: "Forbidden: You do not have permission to perform this action" }),
        { status: 403 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Step 1: Delete the task
    const deleteResult = await Task.deleteOne({ _id: taskId });

    if (deleteResult.deletedCount === 0) {
      return new Response(
        JSON.stringify({ status: "error", message: "Task not found" }),
        { status: 404 }
      );
    }

    // Step 2: Remove the task ID from the user's tasks array
    await User.updateOne(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    return new Response(
      JSON.stringify({ status: "success", message: "Task deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: "error", message: (error as Error).message || "Internal server error" }),
      { status: 500 }
    );
  }
}
