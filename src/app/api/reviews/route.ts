import { NextRequest } from "next/server";
import { prisma } from "~/prisma/prisma";

export async function GET(request: NextRequest) {
  const takeValue = request.nextUrl.searchParams.get("take");
  try {
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
