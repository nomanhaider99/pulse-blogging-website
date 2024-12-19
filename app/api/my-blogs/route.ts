import { db } from "@/drizzle/drizzle";
import { blogs } from "@/drizzle/schema";
import { eq } from "drizzle-orm";  
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const allBlogs = await db
            .select()
            .from(blogs)
            .where(eq(blogs.userId, userId));

        return NextResponse.json({
            data: allBlogs
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
