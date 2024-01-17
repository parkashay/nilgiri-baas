import { NextRequest } from "next/server";
import { prisma } from "~/prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { name, address, phone, email } = body;
  try {
    const customer = await prisma.customer.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        address,
        phone,
        email,
      },
    });
    prisma.$disconnect();
    return Response.json(customer, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customer = await prisma.customer.delete({
      where: {
        id: params.id,
      },
    });
    prisma.$disconnect();
    return Response.json(customer, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}