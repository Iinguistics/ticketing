import {
	Publisher,
	Subjects,
	OrderCancelledEvent,
} from '@jmsgoytia-ticketing/common';

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled
}

export default OrderCancelledPublisher;
