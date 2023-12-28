import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  try {
    const prisma = new PrismaClient();
    const count = await prisma.room.count();
    const rooms = await prisma.room.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
      skip: page ? 10 * (page - 1) : 0,
      include: {
        customers: true,
        Review: true,
      },
    });
    prisma.$disconnect();
    return Response.json({ total: count, rooms }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    try {
      const prisma = new PrismaClient();
      const deleteReviews = await prisma.review.deleteMany({
        where: {
          roomId: id,
          customer: {
            roomId: id,
          },
        },
      });
      const deleteCustomers = await prisma.customer.deleteMany({
        where: {
          roomId: id,
        },
      });
      const deleteRes = await prisma.room.delete({
        where: {
          id: id,
        },
      });
      prisma.$disconnect();
      return Response.json({ deleteRes }, { status: 200 });
    } catch (err) {
      console.log(err);
      return Response.json({ err }, { status: 500 });
    }
  }
}
