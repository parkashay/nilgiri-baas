"use client";
import { Customer, Room } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface BookingHistoryTableProps {
  room: Room;
  customer: Customer;
}
export default function BookingHistoryTable({
  room,
  customer,
}: BookingHistoryTableProps) {
  return (
    <Table aria-label="booking history table" className="my-3">
      <TableHeader>
        <TableColumn>Room Number</TableColumn>
        <TableColumn>Check In - Check Out</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell> {room.number} </TableCell>
          <TableCell>
            {" "}
            {String(new Date(customer.checkinDate).toDateString())} -{" "}
            {customer.checkoutDate
              ? String(new Date(customer.checkoutDate).toDateString())
              : "not checked out"}{" "}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
