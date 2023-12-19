// import { prisma } from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function GET(request: Request) {
  try {
    const rooms = await prisma.room.findMany();
    return Response.json(rooms, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
