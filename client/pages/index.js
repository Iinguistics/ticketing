import Link from 'next/link';
import NoContent from '../components/cards/no-content';
import Table from '../components/table';
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

	const headerList = ['Title', 'Date', 'Price', 'View'];

	const bodyList = tickets.map((ticket) => (
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
		<Table
			body={bodyList}
			headers={headerList}
			striped={true}
			title='Tickets for sale'
		/>
	);
};

LandingPage.getInitialProps = async (context, httpClient) => {
	return new TicketService({ httpClient }).getTickets();
};

export default LandingPage;
