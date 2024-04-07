import { Subjects } from './Subjects';

export interface OrderCancelledEvent {
	data: {
		id: string;
		ticket: {
			id: string;
		};
		userId: string;
	};
	subject: Subjects.OrderCancelled;
}
