import { Input } from "@nextui-org/react";
import React, { ChangeEvent } from "react";

export interface RoomFormProps {
  data?:
    | {
        roomNumber?: string | undefined;
        price?: string | undefined;
        capacity?: string | undefined;
      }
    | undefined;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
function RoomForm({ data, handleChange }: RoomFormProps) {
  return (
    <>
      <Input
        autoFocus
        isRequired
        label="roomNumber"
        name="roomNumber"
        placeholder="201 C"
        variant="bordered"
        value={data?.roomNumber}
        onChange={handleChange}
      />
      <Input
        isRequired
        label="Price"
        type="number"
        placeholder="1000"
        name="price"
        variant="bordered"
        value={data?.price}
        onChange={handleChange}
      />
      <Input
        isRequired
        label="Capacity"
        type="number"
        placeholder="2"
        name="capacity"
        variant="bordered"
        value={data?.capacity}
        onChange={handleChange}
      />
    </>
  );
}

export default RoomForm;
