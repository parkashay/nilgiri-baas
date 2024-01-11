import { Room } from "@/types/types";
import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

export interface CustomerFormProps {
  data?: {
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
    address: string;
    roomId: string;
    checkinDate?: Date;
    checkoutDate?: Date;
  };
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomerForm = ({ data, handleChange }: CustomerFormProps) => {
  const [rooms, setRooms] = useState<Room[] | undefined>();
  useEffect(() => {
    fetch("/api/rooms/vacant", {cache: "no-store"})
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <>
      <Input
        autoFocus
        isRequired
        label="Name"
        name="name"
        placeholder="John Doe"
        variant="bordered"
        value={data?.name}
        onChange={handleChange}
      />

      <Input
        isRequired
        label="Address"
        name="address"
        placeholder="123 Main St"
        variant="bordered"
        value={data?.address}
        onChange={handleChange}
      />

      <Input
        isRequired
        label="Phone"
        name="phone"
        placeholder="123-456-7890"
        variant="bordered"
        value={data?.phone}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        placeholder="X7jQH@example.com"
        variant="bordered"
        value={data?.email}
        onChange={handleChange}
      />

      {rooms ? (
        rooms?.length > 0 ? (
          <Select items={rooms} label="Room" name="roomId" isRequired>
            {(room) => (
              <SelectItem
                key={room.id}
                classNames={{ title: "flex justify-between text-primary" }}
              >
                {" "}
                <span>Room: {room.number} </span>{" "}
                <span>Capacity: {room.capacity}</span>{" "}
              </SelectItem>
            )}
          </Select>
        ) : (
          <div className="bg-danger/70 px-3 py-2 rounded-lg text-text">
            No Vacant Rooms !!
          </div>
        )
      ) : (
        <Spinner />
      )}

      <Input name="checkinDate" type="date" />
    </>
  );
};

export default CustomerForm;
