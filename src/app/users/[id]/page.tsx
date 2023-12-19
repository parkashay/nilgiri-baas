import BookingHistoryTable from "@/components/table/BookingHistoryTable";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { MdEmail, MdLocationPin, MdPerson, MdPhone } from "react-icons/md";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <section>
      <Card className="bg-primary/10">
        <CardBody>
          <div className="flex justify-around items-center">
            <div className="flex flex-col gap-3 text-lg">
              <div className="flex gap-3 "> <span className="text-primary font-bold flex gap-2 items-center"> <MdPerson/> Name:</span> Ram Bahadur Thapa </div>
              <div className="flex gap-3 "> <span className="text-primary font-bold flex gap-2 items-center"> <MdLocationPin /> Address:</span> Pokhara, Bhimsen tol </div>
              <div className="flex gap-3 "> <span className="text-primary font-bold flex gap-2 items-center"> <MdPhone /> Phone:</span> +977 98090909090 </div>
              <div className="flex gap-3 "> <span className="text-primary font-bold flex gap-2 items-center"> <MdEmail /> Email:</span> ram@yahoo.com </div>
            </div>
            <div className="">
              <Image src="https://cdn.pixabay.com/photo/2023/11/05/13/19/christmas-8367102_1280.jpg" height={200} width={200} />
            </div>
          </div>
          <Divider className="my-3" />
          <div>
            <h2>Rooms Booking History:</h2>
            <BookingHistoryTable />
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default page;
