import { Id } from '@jmsgoytia-ticketing/common';
import { OrderStatus } from '../../models/order';

type Properties = Readonly<{
	id: Id;
	price: number;
	status: OrderStatus;
	userId: Id;
	version: number;
}>;

export default Properties;
