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
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiLocationOn, CiMail, CiPhone, CiSearch } from "react-icons/ci";
import { MdCheckCircle, MdLogout } from "react-icons/md";

type TableProps = {
  tableData: Customer[];
};

const TableColumns = [
  "",
  "Name",
  "Booked Room",
  "Address",
  "Email/Phone",
  "Action",
];

const CustomersTable = () => {
  const [rows, setRows] = useState<Customer[]>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const [refetch, setRefetch] = useAtom(refetchAtom);
  const [filteredRows, setFilteredRows] = useState<Customer[]>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [aboutToCheckout, setAboutToCheckout] = useState<
    { customerId: string; roomId: string; name: string } | undefined
  >();

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
  }, [rows, page]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredRows(
      rows?.filter((row) =>
        String(Object.values(row))
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCheckout = (customerId: string, roomId: string, name: string) => {
    setAboutToCheckout({ customerId, roomId, name });
    onOpen();
  };
  const checkoutUser = async () => {
    const formData = new FormData();
    if (aboutToCheckout?.roomId)
      formData.append("roomId", aboutToCheckout?.roomId);
    return new Promise((res, rej) => {
      fetch(`/api/customers/${aboutToCheckout?.customerId}/checkout`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          {
            if (response.status === 200) {
              res("Customer Checked Out");
              setRefetch(!refetch);
              onOpenChange();
            } else {
              rej("Cannot checkout user.");
            }
          }
        })
        .catch(() => rej("some error occured."));
    });
  };

  const checkout = async () => {
    if (aboutToCheckout) {
      toast.promise(checkoutUser(), {
        loading: "Please wait...",
        success: (message) => message + "",
        error: (message) => message,
      });
    }
  };

  return (
    <section className="flex w-full flex-col">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Is {aboutToCheckout?.name} checking out ?
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={checkout}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
              <TableCell>
                {data.checkoutDate ? (
                  <span className="bg-primary/70 px-3 py-2 rounded flex items-center justify-center gap-2 text-text w-full">
                    Checked Out <MdCheckCircle size={20} />
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleCheckout(
                        data.id,
                        data?.room?.id as string,
                        data.name
                      )
                    }
                    className="bg-danger/60 px-3 py-2 rounded w-full flex items-center justify-center text-text"
                  >
                    <MdLogout size={20} />
                  </button>
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
