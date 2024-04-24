import { Address, Id } from '@jmsgoytia-ticketing/common';


type Properties = Readonly<{
	address: Address,
	createdAt: Date;
	date: Date;
	deletedAt: Date | null;
	description: string | null;
	id: Id;
	orderId?: Id;
	price: number;
	title: string;
	userId: Id;
	version: number;
}>;

export default Properties;
