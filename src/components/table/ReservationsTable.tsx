"use client";
import { Reservation } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";

type TableProps = {
  tableData: Reservation[];
};

const TableColumns = ["Room Number", "Reserved By", "Duration"];

const ReservationsTable = ({ tableData }: TableProps) => {
  const [rows, setRows] = useState(tableData);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setRows(
      tableData.filter((row) =>
        String(Object.values(row))
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <section className="flex w-full flex-col">
      <Input
        startContent={<CiSearch size={30} />}
        type="text"
        onChange={(e) => handleSearch(e)}
        className="self-end max-w-[300px] my-2"
        placeholder="type here to search..."
      />
      <Table aria-label="table">
        <TableHeader>
          {TableColumns.map((column) => (
            <TableColumn key={column} className="text-base">
              {" "}
              {column}{" "}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((data) => (
            <TableRow key={data.number}>
              <TableCell> {data.number} </TableCell>
              <TableCell> {data.reservedBy} </TableCell>
              <TableCell> {data.duration} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ReservationsTable;
