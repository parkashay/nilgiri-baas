import { Review } from "@prisma/client";

export type Room = {
  id: string;
  number: string | number;
  price: number;
  capacity: number;
  isVacant: boolean;
  customers?: Customer[];
  reviews?: Review[];
};

export type Reservation = {
  id: string;
  number: string | number;
  reservedBy: string;
  duration: string;
};

export type Customer = {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  address: string;
  roomId: string | number;
  room?: Room;
  checkinDate?: any;
  checkoutDate?: any;
  createdAt?: any;
  updatedAt?: any;
};

export type BreadCrumbType = {
  title: string;
  href?: string;
};

export type CustomerReview = {
  id: number;
  star: number;
  comment: string;
  date: string;
  customer: Customer;
  room: Room;
};
