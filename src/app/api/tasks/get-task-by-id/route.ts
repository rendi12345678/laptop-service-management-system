import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import Task from '@/models/Task';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { status: 'error', message: 'Task ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json(
        { status: 'error', message: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      task,
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
