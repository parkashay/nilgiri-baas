"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function BookingHistoryTable() {
  return (
    <Table aria-label="booking history table" className="my-3">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Room Number</TableColumn>
        <TableColumn>Check In - Check Out</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell> 2023/12/10 </TableCell>
          <TableCell> 203 A </TableCell>
          <TableCell> 2023/12/12 - 2023/12/20 </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
