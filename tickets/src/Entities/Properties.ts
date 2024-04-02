import { Id } from '@jmsgoytia-ticketing/common';
import Listener from '@jmsgoytia-ticketing/common'

class Test extends Listener {
	
}

type Properties = Readonly<{
	createdAt: Date;
	deletedAt: Date | null;
	id: Id;
	price: number;
	title: string;
	userId: Id;
}>;

export default Properties;
