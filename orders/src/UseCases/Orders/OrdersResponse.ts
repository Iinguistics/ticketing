import Order from '../../types/Order';

type Response = Readonly<{
	orders: Order[];
}>;

export default Response;
