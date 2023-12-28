import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = new PrismaClient();
    const customer = await prisma.customer.findUnique({
      where: {
        id: params.id,
      },
      include: {
        room: true,
      },
    });
    prisma.$disconnect();
    return Response.json(customer, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
