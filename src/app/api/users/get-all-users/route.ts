import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { serializeData } from "@/lib/utils";
import { getCache, setCache } from "@/lib/redis/cache";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    const cacheKey = "users";

    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    await connectToDatabase();

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const totalItemsLength = await User.find({ role: { $ne: "admin" } }).countDocuments();

    const response = {
      status: "success",
      message: "Users fetched successfully.",
      items: serializeData(users),
      totalItemsLength,
    };

    await setCache(cacheKey, response);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: (error as { message: string }).message || "Internal server error.",
    }, { status: 500 });
  }
}
