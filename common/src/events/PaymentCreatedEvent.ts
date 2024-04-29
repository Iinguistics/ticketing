import { Subjects } from './Subjects';

export interface PaymentCreatedEvent {
	data: {
		email: string;
		id: string;
		orderId: string;
		stripeId: string;
	};
	subject: Subjects.PaymentCreated;
}
