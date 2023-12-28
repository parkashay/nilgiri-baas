import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

export async function GET() {
  const prisma = new PrismaClient();

  async function generateDummyData() {
    const rooms = [];
    const customers = [];
    const reviews = [];

    for (let i = 0; i < 20; i++) {
      const room = await prisma.room.create({
        data: {
          number: `Room ${i + 1}`,
          capacity: faker.number.int({ min: 1, max: 5 }),
        },
      });
      rooms.push(room);

      const customer = await prisma.customer.create({
        data: {
          name: faker.name.firstName(),
          avatar: faker.image.avatar(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
          address: faker.location.city(),
          roomId: room.id,
        },
      });
      customers.push(customer);

      const review = await prisma.review.create({
        data: {
          star: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          comment: faker.lorem.paragraph(),
          customerId: customer.id,
          roomId: room.id,
        },
      });
      reviews.push(review);
    }

    console.log("Dummy data inserted successfully.");
  }

  try {
    await generateDummyData();
    await prisma.$disconnect();
    return Response.json({ message: "Dummy data inserted successfully." });
  } catch (error) {
    return Response.json({ error });
  }
}