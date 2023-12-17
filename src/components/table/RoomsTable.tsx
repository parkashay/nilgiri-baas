"use client";
import { Room } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Chip,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

type TableProps = {
  tableData: Room[];
};

const TableColumns = ["Room Number", "Capacity", "Price", "Vacancy"];

const RoomsTable = ({ tableData }: TableProps) => {
  const [rows, setRows] = useState(tableData);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRows(
      tableData.filter((row) =>
        String(Object.values(row)).toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <section className="flex flex-col w-full">
      <Input
        onChange={(e) => handleSearchChange(e)}
        type="text"
        label="Search"
        className="self-end max-w-[300px] my-2"
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
              <TableCell> {data.capacity} </TableCell>
              <TableCell> NPR. {data.price}/- </TableCell>
              <TableCell>
                {data.vacancy ? (
                  <Chip size="sm" variant="flat" color="primary" >available</Chip>
                ) : (
                  <Chip size="sm" variant="flat" color="danger">booked</Chip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default RoomsTable;
