import { Id } from '@jmsgoytia-ticketing/common';

type Properties = Readonly<{
	id: Id;
	price: number;
	title: string;
}>;

export default Properties;
