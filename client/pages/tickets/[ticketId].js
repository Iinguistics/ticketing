import Router from 'next/router';
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
		<div>
			<h1>{ticket.title}</h1>
			<h5>Price: {ticket.price}</h5>
			{errors}
			<button className='btn btn-primary' onClick={() => doRequest()}>
				Reserve
			</button>
		</div>
	);
};

show.getInitialProps = async (context, client) => {
	const { ticketId } = context.query;
	const { data } = await client.get(`${urls.ticketSrv.show}/${ticketId}`);

	return { ticket: data.ticket };
};

export default show;
