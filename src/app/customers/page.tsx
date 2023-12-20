import CustomersTable from "@/components/table/CustomersTable";
import { Customer } from "@/types/types";
import React from "react";


async function getCustomers() {
  try {
    const res = await fetch("http://localhost:3000/api/customers", {cache: 'no-cache'});
    const customers = await res.json();
    if(!customers.err) return customers;
    return undefined;
  } catch (err) {
    return undefined;
  }
}
const page = async () => {
  const customers = await getCustomers();
  return (
    <main className="px-3 lg:px-12">
      <h1>Customers</h1>
      <section>
        <CustomersTable tableData={customers ?? []} />
      </section>
    </main>
  );
};

export default page;
