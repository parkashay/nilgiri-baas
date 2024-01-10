import AddNewCustomer from "@/components/customers/AddNewCustomer";
import CustomersTable from "@/components/table/CustomersTable";

const page = async () => {
  return (
    <main className="px-3 lg:px-12">
      <h1>Customers</h1>
      <div className="my-2 flex justify-end">
        <AddNewCustomer />
      </div>
      <section>
        <CustomersTable />
      </section>
    </main>
  );
};

export default page;
