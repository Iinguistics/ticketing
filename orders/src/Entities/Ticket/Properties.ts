import { Id } from '@jmsgoytia-ticketing/common';

type Properties = Readonly<{
	id: Id;
	price: number;
	title: string;
	version: number;
}>;

export default Properties;
