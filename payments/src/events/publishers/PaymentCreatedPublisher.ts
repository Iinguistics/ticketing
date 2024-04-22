import {
	PaymentCreatedEvent,
	Publisher,
	Subjects,
} from '@jmsgoytia-ticketing/common';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
}

export default PaymentCreatedPublisher;
