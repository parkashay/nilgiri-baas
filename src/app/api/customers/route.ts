import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  try {
    const prisma = new PrismaClient();
    const customers = await prisma.customer.findMany({ include: {room: true} });
    prisma.$disconnect();
    return Response.json(customers, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
