import { OrderStatus } from './OrderStatus';
import { Subjects } from './Subjects';

export interface OrderCreatedEvent {
	data: {
		// converting to string from Date
		expiresAt: string;
		id: string;
		status: OrderStatus;
		ticket: {
			id: string;
			price: number;
		};
		userId: string;
	};
	subject: Subjects.OrderCreated;
}
