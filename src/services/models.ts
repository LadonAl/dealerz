export type DateTime = string;

export type Category = string;

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  rating?: Rating;
}

export interface CartLine {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: DateTime;
  products: CartLine[];
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: FullName;
  address: Address;
}

export type Record = Category | Product | Cart | User;
