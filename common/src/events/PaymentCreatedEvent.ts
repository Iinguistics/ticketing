import { Subjects } from './Subjects';

export interface PaymentCreatedEvent {
	data: {
		id: string;
		orderId: string;
		stripeId: string;
	};
	subject: Subjects.PaymentCreated;
}
