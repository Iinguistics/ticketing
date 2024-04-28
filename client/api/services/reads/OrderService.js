import urls from '../../urls';

class OrderService {
	constructor(dependencies) {
		this.httpClient = dependencies.httpClient;
	}

	async getOrders() {
		const { data } = await this.httpClient.get(urls.ordersSrv.orders);

		return { orders: data.orders.map(OrderService.#mapOrder) };
	}

	async getById(orderId) {
		const response = await this.httpClient.get(
			`${urls.ordersSrv.show}/${orderId}`
		);

		return { order: OrderService.#mapOrder(response.data.order) };
	}

	static #mapOrder(order) {
		return {
			createdAt: new Date(order.created_at).toDateString(),
			expiresAt: order.expires_at,
			id: order.id,
			status: order.status,
			ticketPrice: order.ticket_price,
			ticketTitle: order.ticket_title,
			userId: order.user_id,
		};
	}
}

export default OrderService;
