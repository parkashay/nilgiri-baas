import ReservationsTable from "@/components/table/ReservationsTable";
import { Customer, Reservation } from "@/types/types";
import React from "react";

async function getCustomers(): Promise<Customer[] | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`, {
      cache: "no-cache",
    });
    const customers = await res.json();
    const reservations = customers?.filter(
      (customer: Customer) => !customer.checkoutDate
    );
    return reservations;
  } catch (err) {
    return undefined;
  }
}
const page = async () => {
  const reservations = await getCustomers();

  return (
    <main className="px-3 lg:px-12">
      <h1>Reservations</h1>
      <section>
        <ReservationsTable tableData={reservations || []} />
      </section>
    </main>
  );
};

export default page;
