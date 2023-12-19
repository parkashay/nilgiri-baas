export type Room = {
  number: string | number;
  price: number;
  capacity: number;
  isVacant: boolean;
};

export type Reservation = {
  number: string|number;
  reservedBy: string;
  duration: string;
}

export type Customer = {
  id: number;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  address: string;
  roomId: string | number;
}

export type BreadCrumbType = {
  title: string;
  href?: string;
}

export type CustomerReview = {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  email?: string;
}