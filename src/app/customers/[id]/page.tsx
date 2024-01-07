import BookingHistoryTable from "@/components/table/BookingHistoryTable";
import { Customer } from "@/types/types";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { MdEmail, MdLocationPin, MdPerson, MdPhone } from "react-icons/md";

async function getCustomer(customerId: string): Promise<Customer | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers/${customerId}`
    , {cache: 'no-cache'});
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
}
const page = async ({ params }: { params: { id: string } }) => {
  const customerId = params.id;
  const customer = await getCustomer(customerId);
  return (
    <section>
      <Card className="bg-primary/10">
        <CardBody>
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-3 text-lg">
              <div className="flex gap-3 ">
                {" "}
                <span className="text-primary font-bold flex gap-2 items-center">
                  {" "}
                  <MdPerson /> Name:
                </span>{" "}
                {customer?.name}{" "}
              </div>
              <div className="flex gap-3 ">
                {" "}
                <span className="text-primary font-bold flex gap-2 items-center">
                  {" "}
                  <MdLocationPin /> Address:
                </span>{" "}
                {customer?.address}{" "}
              </div>
              {
                customer?.phone && <div className="flex gap-3 ">
                {" "}
                <span className="text-primary font-bold flex gap-2 items-center">
                  {" "}
                  <MdPhone /> Phone:
                </span>{" "}
                {customer.phone}{" "}
              </div>
              }
              {
                customer?.email && <div className="flex gap-3 ">
                {" "}
                <span className="text-primary font-bold flex gap-2 items-center">
                  {" "}
                  <MdEmail /> Email:
                </span>{" "}
                {customer.email}{" "}
              </div>
              }
            </div>
            <div className="">
              <Image
                src={customer?.avatar}
                height={200}
                width={200}
              />
            </div>
          </div>
          <Divider className="my-3" />
          <div>
            <h2>Rooms Booking History:</h2>
            {
              customer && customer.room && <BookingHistoryTable customer={customer} room={customer?.room} />
            }
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default page;
