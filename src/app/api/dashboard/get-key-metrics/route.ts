import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/User';
import Task from '@/models/Task';
import { getCache, setCache } from '@/lib/redis/cache';

async function fetchMetrics() {
  await connectToDatabase();

  const totalUsers = await User.countDocuments();
  const totalInProgressTasks = await Task.countDocuments({
    status: { $in: ['Pending', 'In Progress'] },
  });
  const totalActiveTasks = totalInProgressTasks;
  const totalCompletedTasks = await Task.countDocuments({ status: 'Completed' });

  return {
    totalUsers,
    totalInProgressTasks,
    totalActiveTasks,
    totalCompletedTasks,
  };
}

export async function GET() {
  const cacheKey = 'metrics';

  try {
    const cachedMetrics = await getCache('metrics');

    if (cachedMetrics) {

      return NextResponse.json({
        status: 'success',
        metrics: cachedMetrics,
      });
    }

    const metrics = await fetchMetrics();

    await setCache(cacheKey, metrics);

    return NextResponse.json({
      status: 'success',
      metrics,
    });
  } catch (error) {

    return NextResponse.json(
      {
        status: 'error',
        message: (error as { message: string }).message || 'Internal server error.',
      },
      { status: 500 }
    );
  }
}
