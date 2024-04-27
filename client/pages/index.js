import Link from 'next/link';
import NoContent from '../components/cards/no-content';
import TicketService from '../api/services/reads/TicketService';

const LandingPage = ({ tickets }) => {
	if (!tickets.length) {
		return (
			<NoContent
				header={'Ticket listings'}
				href={'/tickets/create'}
				linkText={'Sell a ticket'}
				text={'There are currently no tickets available at this time'}
				title={'No listed tickets'}
			/>
		);
	}

	const ticketList = tickets.map((ticket) => (
		<tr key={ticket.id}>
			<td>{ticket.title}</td>
			<td>{ticket.date}</td>
			<td>{ticket.price}</td>
			<td>
				<Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
					See Details
				</Link>
			</td>
		</tr>
	));

	return (
		<div>
			<h1>Tickets for sale</h1>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Date</th>
						<th>Price</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	);
};

LandingPage.getInitialProps = async (context, httpClient) => {
	return new TicketService({ httpClient }).getTickets();
};

export default LandingPage;
