export type User = {
  id: string;
  name: string;
  image: string;
  email: string;
  email_verified: undefined | Date;
};

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  orderStatus: string;
  orderItems: OrderItem[];
}
