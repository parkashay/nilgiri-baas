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
  Pagination,
} from "@nextui-org/react";
import { ChangeEvent, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";

type TableProps = {
  tableData: Customer[];
};

const TableColumns = ["Room Number", "Reserved By", "Duration"];

const ReservationsTable = ({ tableData }: TableProps) => {
  const [rows, setRows] = useState(tableData);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(tableData.length / rowsPerPage);
  
  const changedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setRows(tableData?.slice(start, end));
  }, [page, tableData]);

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
      <Table
        aria-label="table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
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
              <TableCell> {data.room?.number} </TableCell>
              <TableCell> {data.name} </TableCell>
              <TableCell>
                {" "}
                {String(new Date(data.checkinDate).toDateString())} -{" "}
                {String(new Date(data.checkoutDate).toDateString())}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ReservationsTable;
