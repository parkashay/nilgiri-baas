import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const rooms = await prisma.room.findMany({
      where: {
        isVacant: true,
      },
    });
    prisma.$disconnect();
    return Response.json(rooms, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
