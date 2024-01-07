import CustomersTable from "@/components/table/CustomersTable";

async function getCustomers() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/customers`, {cache: 'no-cache'});
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
