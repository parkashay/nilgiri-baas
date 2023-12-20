"use client";
import { Customer } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Chip,
  Avatar,
  Link,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { CiLocationOn, CiMail, CiPhone, CiSearch } from "react-icons/ci";

type TableProps = {
  tableData: Customer[];
};

const TableColumns = ["", "Name", "Booked Room", "Address", "Email/Phone"];

const CustomersTable = ({ tableData }: TableProps) => {
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
        size="sm"
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
        <TableBody emptyContent="No data available">
          {rows.map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                <Avatar showFallback src={data.avatar} />
              </TableCell>
              <TableCell>
                {" "}
                <Link
                  href={`/customers/${data.id}`}
                  color="success"
                  isBlock
                  showAnchorIcon
                >
                  {data.name}
                </Link>{" "}
              </TableCell>
              <TableCell> {data.roomId}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1">
                  {" "}
                  <CiLocationOn /> {data.address}
                </span>{" "}
              </TableCell>
              <TableCell className="flex flex-col gap-2">
                {data.email && (
                  <Chip variant="flat" startContent={<CiMail />}>
                    {data.email}
                  </Chip>
                )}
                {data.phone && (
                  <Chip variant="flat" startContent={<CiPhone />}>
                    {data.phone}
                  </Chip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default CustomersTable;
