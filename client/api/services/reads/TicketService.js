import urls from '../../urls';

class TicketService {
	constructor(dependencies) {
		this.httpClient = dependencies.httpClient;
	}

	async getTickets() {
		const { data } = await this.httpClient.get(urls.ticketSrv.tickets);

		return { tickets: data.tickets.map(TicketService.#mapTicket) };
	}

	async show(ticketId) {
		const response = await this.httpClient.get(
			`${urls.ticketSrv.show}/${ticketId}`
		);

		return { ticket: TicketService.#mapTicket(response.data.ticket) };
	}

	static #mapTicket(ticket) {
		return {
			address: TicketService.#addressToString(
				TicketService.#mapAddress(ticket.address)
			),
			createdAt: new Date(ticket.created_at).toDateString(),
			date: new Date(ticket.date).toDateString(),
			description: ticket.description,
			id: ticket.id,
			price: ticket.price,
			title: ticket.title,
			userId: ticket.user_id,
		};
	}

	static #mapAddress(address) {
		return {
			city: address.city,
			postalCode: address.postal_code,
			state: address.state,
			streetAddress: address.street_address,
		};
	}

	static #addressToString(address) {
		return `${address.streetAddress}, ${address.city}, ${address.state} ${address.postalCode}`;
	}
}

export default TicketService;
