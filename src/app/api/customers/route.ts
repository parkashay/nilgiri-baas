import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  try {
    const prisma = new PrismaClient();
    const customers = await prisma.customer.findMany({
      orderBy: {checkoutDate: "asc"},
      include: { room: true },
    });
    prisma.$disconnect();
    return Response.json(customers, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const address = String(formData.get("address"));
  const phone = String(formData.get("phone"));
  const email = String(formData.get("email"));
  const roomId = String(formData.get("roomId"));
  const checkinDate = String(formData.get("checkinDate"));
  console.log(checkinDate);
  if (!name || !address || !phone || !roomId) {
    return Response.json(
      { error: "All fields are required, name, address, phone and roomId" },
      { status: 400 }
    );
  }

  try {
    const prisma = new PrismaClient();
    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        isVacant: false,
      },
    });
    const customer = await prisma.customer.create({
      data: {
        name,
        address,
        phone,
        email,
        roomId,
        checkinDate: checkinDate || undefined,
      },
    });
    prisma.$disconnect();
    return Response.json({ customer }, { status: 201 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
