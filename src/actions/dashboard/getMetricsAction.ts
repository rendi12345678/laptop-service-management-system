import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import Task from "@/models/Task";

const getMetricsAction = async () => {
  try {
    await connectToDatabase();

    const totalUsers = await User.countDocuments();
    const totalInProgressTasks = await Task.countDocuments({
      status: { $in: ['Pending', 'In Progress'] },
    });
    const totalActiveTasks = totalInProgressTasks;
    const totalCompletedTasks = await Task.countDocuments({ status: 'Completed' });

    const metrics = {
      totalUsers,
      totalInProgressTasks,
      totalActiveTasks,
      totalCompletedTasks,
    };

    return { status: 'success', metrics };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return {
      status: 'error',
      message: (error as { message: string }).message || 'Internal server error.',
    };
  }
};

export default getMetricsAction;
