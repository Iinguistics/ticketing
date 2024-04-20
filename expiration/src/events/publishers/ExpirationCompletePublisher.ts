import {
	ExpirationCompleteEvent,
	Publisher,
	Subjects,
} from '@jmsgoytia-ticketing/common';

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
}

export default ExpirationCompletePublisher;
