import ExpirationCompleteListener from './ExpiratonCompleteListener';
import PaymentCreatedListener from './PaymentCreatedListener';
import TicketCreatedListener from './TicketCreatedListener';
import TicketUpdatedListener from './TicketUpdatedListener';

const listeners = [
	ExpirationCompleteListener,
	PaymentCreatedListener,
	TicketCreatedListener,
	TicketUpdatedListener,
];

export default listeners;
