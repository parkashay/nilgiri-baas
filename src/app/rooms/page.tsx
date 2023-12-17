import ReservationsTable from "@/components/table/RoomsTable";
import { Room } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description: "All available rooms !!",
};

const tableData: Room[] = [
  {
    number: 203,
    price: 700,
    capacity: 2,
    vacancy: true,
  },
  {
    number: 103,
    price: 500,
    capacity: 1,
    vacancy: false,
  },
  {
    number: 206,
    price: 1200,
    capacity: 4,
    vacancy: true,
  },
  {
    number: "A-304",
    price: 1000,
    capacity: 2,
    vacancy: false,
  },
];


export default function App() {
  return (
    <main className="px-3 lg:px-12">
      <h1>Rooms</h1>
      <ReservationsTable tableData={tableData} />
    </main>
  );
}
