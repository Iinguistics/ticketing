import urls from '../api/urls';

const LandingPage = ({ currentUser, tickets }) => {
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
			<h1>Tickets</h1>
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

	return { tickets: data };
};

export default LandingPage;
