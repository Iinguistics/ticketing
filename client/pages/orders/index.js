import urls from '../../api/urls';

const orders = ({ orders }) => {
	return (
		<ul>
			{orders.map((order) => (
				<li key={order.id}>
					{order.ticket_title} - {order.status}
				</li>
			))}
		</ul>
	);
};

orders.getInitialProps = async (context, client) => {
	const { data } = await client.get(`${urls.ordersSrv.orders}`);

	return { orders: data };
};

export default orders;
