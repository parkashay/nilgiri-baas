"use client";
import React, { FormEvent, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import RoomForm from "../forms/create-room/RoomForm";
import { MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { refetchAtom } from "@/jotai/atoms";

export default function AddNewRoom() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [refetch, setRefetch] = useAtom(refetchAtom)
  const createRoom = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      fetch("/api/rooms", {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.status === 500) {
          reject("Room already exists !!");
        } else {
          formRef?.current?.reset();
          onOpenChange();
          setRefetch(!refetch)
          resolve("room created successfully !!");
        }
      });
    });
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    toast.promise(createRoom(formData), {
      loading: "Please wait...",
      success: (message) => message + "",
      error: (err) => err,
    });
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        New Room <MdAdd size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit} ref={formRef}>
              <ModalHeader className="flex flex-col gap-1">
                Create a new Room
              </ModalHeader>
              <ModalBody>
                <RoomForm />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Create <MdAdd />
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
