"use client";
import { refetchAtom } from "@/jotai/atoms";
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
  Pagination,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { CiLocationOn, CiMail, CiPhone, CiSearch } from "react-icons/ci";

type TableProps = {
  tableData: Customer[];
};

const TableColumns = ["", "Name", "Booked Room", "Address", "Email/Phone"];

const CustomersTable = () => {
  const [rows, setRows] = useState<Customer[]>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const [refetch] = useAtom(refetchAtom);
  const [filteredRows, setFilteredRows] = useState<Customer[]>();

  useEffect(() => {
    async function getCustomers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/customers`,
          { cache: "no-cache" }
        );
        const customers = await res.json();
        if (!customers.err) {
          setRows(customers);
        }
        return undefined;
      } catch (err) {
        return undefined;
      }
    }
    getCustomers();
  }, [refetch]);

  useEffect(() => {
    setFilteredRows(rows?.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  },[rows, page])
  
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredRows(
      rows?.filter((row) =>
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
              total={Math.ceil(rows ? rows?.length / rowsPerPage : 0)}
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
        <TableBody items={filteredRows ?? []} emptyContent="No data available">
          {(data) => (
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
              <TableCell> {data.room?.number}</TableCell>
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
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default CustomersTable;
