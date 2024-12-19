import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import Task from '@/models/Task';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { description, totalCost, customerName, customerPhone, serialNumber, laptopBrand, laptopModel } = await req.json();

    await connectToDatabase();

    // Check if a task with the same customer name, phone, or serial number already exists
    const existingTask = await Task.findOne({
      $or: [{ customerName }, { customerPhone }, { serialNumber }],
    });

    if (existingTask) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Task with the same customer name, phone, or serial number already exists.',
        },
        { status: 400 }
      );
    }

    // Find workers (filter by role 'worker')
    const workers = await User.find({ role: 'worker' }).populate('tasks');

    if (workers.length === 0) {
      return NextResponse.json({
        status: 'error',
        message: 'No workers available to assign the task to.',
      }, { status: 500 });
    }

    let selectedUser = workers[0];
    let leastTasksCount = selectedUser.tasks.length;

    // Find the worker with the least number of tasks
    for (const worker of workers) {
      const taskCount = worker.tasks.length;
      if (taskCount < leastTasksCount) {
        selectedUser = worker;
        leastTasksCount = taskCount;
      }
    }

    // If no worker found, return an error
    if (!selectedUser) {
      return NextResponse.json({
        status: 'error',
        message: 'No available workers to assign the task to.',
      }, { status: 500 });
    }

    // Create a new task and assign it to the selected worker
    const newTask = new Task({
      description,
      workerId: selectedUser._id,
      customerName,
      customerPhone,
      status: 'Pending',
      serialNumber,
      laptopBrand,
      laptopModel,
      totalCost
    });

    await newTask.save();

    // Update the selected worker with the new task
    selectedUser.tasks.push(newTask._id);
    await selectedUser.save();

    return NextResponse.json({
      status: 'success',
      message: 'Task created and assigned successfully!',
      task: newTask,
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
