import ReservationsTable from "@/components/table/RoomsTable";
import { Room } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description: "All available rooms !!",
};

async function getRooms() {
  try {
    const res = await fetch("http://localhost:3000/api/rooms");
    return res.json();
  } catch (err) {
    return undefined;
  }
}
export default async function Page() {
  const rooms = await getRooms();
  return (
    <main className="px-3 lg:px-12">
      <h1>Rooms</h1>
      <ReservationsTable tableData={rooms ?? []} />
    </main>
  );
}
