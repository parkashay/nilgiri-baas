import { NextRequest } from "next/server";
import { prisma } from "~/prisma/prisma";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.formData();
    const roomId = String(body.get('roomId'));
    const checkoutDate = new Date(Date.now());
    try {
        await prisma.room.update({
            data:{
                isVacant: true,
            },
            where: {
                id: roomId,
            }
        })
        const customer = await prisma.customer.update({
            where: {
                id: params.id,
            },
            data: {
                checkoutDate,
            },
        });
        prisma.$disconnect();
        return Response.json(customer, { status: 200 });
    } catch (err) {
        return Response.json({ err }, { status: 500 });
    }


}