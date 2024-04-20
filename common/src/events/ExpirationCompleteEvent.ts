import { Subjects } from './Subjects';

export interface ExpirationCompleteEvent {
	data: {
		orderId: string;
	};
	subject: Subjects.ExpirationComplete;
}
