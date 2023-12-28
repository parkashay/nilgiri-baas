import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const takeValue = request.nextUrl.searchParams.get("take");
  try {
    const prisma = new PrismaClient();
    const reviews = await prisma.review.findMany({
      include: {
        customer: true,
        room: true,
      },
      take: takeValue ? Number(takeValue) : undefined,
      orderBy: {date: "desc"}
    });
    prisma.$disconnect();
    return Response.json(reviews);
  } catch (err) {
    return Response.json(err);
  }
}
