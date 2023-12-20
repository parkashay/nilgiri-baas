import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const reviews = await prisma.review.findMany({
      include: {
        customer: true,
        room: true,
      },
    });
    return Response.json(reviews);
  } catch (err) {
    return Response.json(err);
  }
}
