import RoomsTableContainer from "@/components/RoomsTableContainer/RoomsTableContainer";
import AddNewRoom from "@/components/rooms/AddNewRoom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
  description: "All available rooms !!",
};

export default async function Page() {
  return (
    <main className="px-3 lg:px-12">
      <h1>Rooms</h1>
      <div className="my-2 flex justify-end">
        <AddNewRoom />
      </div>
      <RoomsTableContainer />
    </main>
  );
}
