"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { FormEvent, useRef } from "react";
import { MdAdd, MdPerson } from "react-icons/md";
import CustomerForm from "../forms/create-customer/CustomerForm";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { refetchAtom } from "@/jotai/atoms";

async function create(formData: FormData) {
  return new Promise((resolve, reject) => {
    fetch("/api/customers", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.status === 500) {
        reject("Customer already exists !!");
      } else {
        resolve("customer created successfully !!");
      }
    });
  });
}
const AddNewCustomer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [refetch, setRefetch] = useAtom(refetchAtom);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    toast.promise(create(formData), {
      error: (err) => err,
      loading: "Please Wait...",
      success: (message) => {
        formRef.current?.reset();
        onOpenChange();
        setRefetch(!refetch);
        return message + "";
      },
    });
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        <MdPerson size={20} /> New Customer <MdAdd size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit} ref={formRef}>
              <ModalHeader className="flex flex-row items-center justify-center bg-primary/50 gap-1">
                <MdPerson size={30} /> Create a new Customer
              </ModalHeader>
              <ModalBody className="my-3">
                <CustomerForm />
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
};

export default AddNewCustomer;
