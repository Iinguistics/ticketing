import ExpirationCompleteListener from './ExpiratonCompleteListener';
import TicketCreatedListener from './TicketCreatedListener';
import TicketUpdatedListener from './TicketUpdatedListener';

const listeners = [
	ExpirationCompleteListener,
	TicketCreatedListener,
	TicketUpdatedListener,
];

export default listeners;
