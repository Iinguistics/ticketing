import Link from 'next/link';
import NoContent from '../components/cards/no-content';
import urls from '../api/urls';

const LandingPage = ({ currentUser, tickets }) => {
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

	const ticketList = tickets.map((ticket) => {
		return (
			<tr key={ticket.id}>
				<td>{ticket.title}</td>
				<td>{ticket.price}</td>
				<td>
					<Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
						View
					</Link>
				</td>
			</tr>
		);
	});

	return (
		<div>
			<h1>Tickets for sale</h1>
			<table className='table'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	);
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get(urls.ticketSrv.tickets);

	return { tickets: data.tickets };
};

export default LandingPage;
