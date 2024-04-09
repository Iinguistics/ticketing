import { Subjects } from './Subjects';

export interface OrderCancelledEvent {
	data: {
		id: string;
		ticket: {
			id: string;
		};
		userId: string;
		version: number;
	};
	subject: Subjects.OrderCancelled;
}
