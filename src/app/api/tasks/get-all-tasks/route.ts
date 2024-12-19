import { NextResponse } from 'next/server';
import { serializeData } from "@/lib/utils";
import { connectToDatabase } from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getCache, setCache } from '@/lib/redis/cache';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const skip = (page - 1) * limit;

  const cacheKey = "tasks";

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log("Returning cached data.");
      return NextResponse.json(cachedData);
    }

    await connectToDatabase();

    const tasks = await Task.find().skip(skip).limit(limit).lean();
    const totalItemsLength = await Task.countDocuments();

    const response = {
      status: 'success',
      tasks: serializeData(tasks),
      totalItemsLength,
    };

    await setCache(cacheKey, response);

    return NextResponse.json(response);
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
