import ReservationsTable from "@/components/table/ReservationsTable";
import { Reservation } from "@/types/types";
import React from "react";

const ReservtionData: Reservation[] = [
  {
    number: 203,
    reservedBy: "Mukunda Nath",
    duration: "Monday - Friday",
  },
  {
    number: "305 A",
    reservedBy: "Hari Prasad",
    duration: "2023/12/07 - 2024/01/04",
  },
];
const page = () => {
  return (
    <main className="px-3 lg:px-12">
      <h1>Reservations</h1>
      <section>
        <ReservationsTable tableData={ReservtionData} />
      </section>
    </main>
  );
};

export default page;
