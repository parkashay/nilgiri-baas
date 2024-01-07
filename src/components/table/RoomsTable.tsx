"use client";
import { refetchAtom } from "@/jotai/atoms";
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
  Pagination,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiSearch, CiTrash } from "react-icons/ci";

type TableProps = {
  total: number;
  rooms: Room[];
};

const TableColumns = ["Room Number", "Capacity", "Price", "Vacancy", "Action"];

const RoomsTable = ({ rooms, total }: TableProps) => {
  const [rows, setRows] = useState(rooms);
  const { isOpen, onOpenChange } = useDisclosure();
  const [aboutToBeDeleted, setAboutToBeDeleted] = useState<
    { id: string; roomNumber: string } | undefined
  >();
  const router = useRouter();

  const [refetch, setRefetch] = useAtom(refetchAtom);

  useEffect(() => {
    setRows(rooms);
  }, [rooms]);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRows(
      rooms.filter((row) =>
        String(Object.values(row))
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleDelete = async (id: string, roomNumber: string) => {
    setAboutToBeDeleted({ id, roomNumber });
    onOpenChange();
  };

  const deleteRoom = (id: string) => {
    const deleteRoom = new Promise((resolve, reject) => {
      fetch(`/api/rooms?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            setRefetch(!refetch);
            resolve("Room has been deleted.");
          } else {
            reject("OOPS!! Some error occured");
          }
        })
        .catch(() => {
          reject("Something went wrong !!");
        });
    });
    toast.promise(deleteRoom, {
      loading: "Please wait...",
      success: (message) => message + "",
      error: (message) => message,
    });
    onOpenChange();
  };

  return rows ? (
    <section className="flex flex-col w-full">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="py-4 px-3">
          <ModalBody>
            {" "}
            <span className="text-xl font-semibold text-danger">
              {" "}
              Delete {aboutToBeDeleted?.roomNumber} ?
            </span>
          </ModalBody>
          <ModalFooter className="flex justify-end">
            <Button color="primary" onClick={onOpenChange}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => deleteRoom(aboutToBeDeleted?.id as string)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Input
        size="sm"
        startContent={<CiSearch size={30} />}
        type="text"
        onChange={(e) => handleSearchChange(e)}
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
        <TableBody emptyContent={"No Data Available"}>
          {rows.map((data) => (
            <TableRow key={data.id}>
              <TableCell> {data.number} </TableCell>
              <TableCell> {data.capacity} </TableCell>
              <TableCell> NPR. {data.price}/- </TableCell>
              <TableCell>
                {data.isVacant ? (
                  <Chip size="sm" variant="flat" color="primary">
                    available
                  </Chip>
                ) : (
                  <Chip size="sm" variant="flat" color="danger">
                    booked
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                <Button
                  className="text-white bg-danger"
                  onClick={() => handleDelete(data.id, data.number as string)}
                >
                  {" "}
                  <CiTrash size={20} />{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        total > 10 ? <div className="my-2">
        <Pagination
          total={Math.ceil(total / 10)}
          initialPage={1}
          isCompact
          showControls
          onChange={(e) => {
            router.push(`?page=${e}`);
          }}
        />
      </div> : ""
      }
    </section>
  ) : (
    ""
  );
};

export default RoomsTable;
