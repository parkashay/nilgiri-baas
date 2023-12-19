import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const customers = await prisma.customer.findMany();
    return Response.json(customers, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
