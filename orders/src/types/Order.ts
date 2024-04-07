import { OrderStatus } from '../models/order';

type Order = Readonly<{
	createdAt: Date;
	expiresAt: Date;
	id: string;
	status: OrderStatus;
	ticketPrice: number;
	ticketTitle: string;
	userId: string;
}>;

export default Order;
