import { OrderStatus } from "@jmsgoytia-ticketing/common";

type UpdateOrderData = {
	modified_at: number;
	status: OrderStatus;
	stripe_id?: string;
};

export default UpdateOrderData;
