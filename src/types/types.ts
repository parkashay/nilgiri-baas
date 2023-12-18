export type Room = {
  number: string | number;
  price: number;
  capacity: number;
  vacancy: boolean;
};

export type Reservation = {
  number: string|number;
  reservedBy: string;
  duration: string;
}

export type Customer = {
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  address: string;
  bookedRoom: string | number;
}