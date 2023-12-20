export type Room = {
  id: number;
  number: string | number;
  price: number;
  capacity: number;
  isVacant: boolean;
};

export type Reservation = {
  id: number;
  number: string | number;
  reservedBy: string;
  duration: string;
};

export type Customer = {
  id: number;
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
