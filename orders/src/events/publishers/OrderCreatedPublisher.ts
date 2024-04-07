import {
	Publisher,
	Subjects,
	OrderCreatedEvent,
} from '@jmsgoytia-ticketing/common';

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated
}

export default OrderCreatedPublisher;
