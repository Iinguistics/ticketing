import Card from '../../components/cards/card';
import Router from 'next/router';
import TicketService from '../../api/services/reads/TicketService';
import useRequest from '../../hooks/use-request';
import urls from '../../api/urls';

const show = ({ ticket }) => {
	const { doRequest, errors } = useRequest({
		url: urls.ordersSrv.create,
		method: 'post',
		body: {
			ticket_id: ticket.id,
		},
		onSuccess: (order) =>
			Router.push('/orders/[orderId]', `/orders/${order.id}`),
	});

	return (
		<Card
			title={ticket.title}
			price={ticket.price}
			subtitle={ticket.date}
			address={ticket.address}
			text={ticket.description}
			buttonText={'Reserve'}
			callback={doRequest}
		/>
	);
};

show.getInitialProps = async (context, httpClient) => {
	const { ticketId } = context.query;

	return new TicketService({ httpClient }).show(ticketId);
};

export default show;
