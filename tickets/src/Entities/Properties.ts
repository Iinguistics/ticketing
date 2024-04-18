import { Id } from '@jmsgoytia-ticketing/common';

type Properties = Readonly<{
	createdAt: Date;
	deletedAt: Date | null;
	id: Id;
	orderId?: Id;
	price: number;
	title: string;
	userId: Id;
	version: number;
}>;

export default Properties;
