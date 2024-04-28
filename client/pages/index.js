import { useState } from 'react';
import TicketModal from '../components/modals/ticket-modal';
import NoContent from '../components/cards/no-content';
import Table from '../components/table';
import TicketService from '../api/services/reads/TicketService';
import useRequest from '../hooks/use-request';
import urls from '../api/urls';

const LandingPage = ({ tickets }) => {
	const [showModal, setShowModal] = useState(false);
	const [ticket, setTicket] = useState(null);

	const { doRequest, errors } = useRequest({
		url: urls.ordersSrv.create,
		method: 'post',
		body: {},
		onSuccess: (order) =>
			Router.push('/orders/[orderId]', `/orders/${order.id}`),
	});

	const handleToggleModal = (ticket) => {
		setTicket(ticket);
		setShowModal((prevState) => !prevState);
	};

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
				<button
					type='button'
					className='btn btn-primary btn-sm'
					onClick={() => handleToggleModal(ticket)}
				>
					View Details
				</button>
			</td>
		</tr>
	));

	return (
		<>
			<Table
				body={bodyList}
				headers={headerList}
				striped={true}
				title='Tickets for sale'
			/>

			{ticket && (
				<TicketModal
					callback={doRequest}
					callbackErrors={errors}
					showModal={showModal}
					handleToggleModal={handleToggleModal}
					ticket={ticket}
				/>
			)}
		</>
	);
};

LandingPage.getInitialProps = async (context, httpClient) => {
	return new TicketService({ httpClient }).getTickets();
};

export default LandingPage;
