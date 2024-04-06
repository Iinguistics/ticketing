import { OrderStatus } from '../../models/order';

export type Order = Readonly<{
	createdAt: Date;
	expiresAt: Date;
	id: string;
	status: OrderStatus;
	ticketPrice: number;
	ticketTitle: string;
}>;

type Response = Readonly<{
	orders: Order[];
}>;

export default Response;
