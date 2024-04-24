import urls from '../../api/urls';
import NoContent from '../../components/cards/no-content';

const orders = ({ orders }) => {
	if (!orders.length) {
		return (
			<NoContent
				description={'You have no current orders at this time'}
				header={'Order listings'}
				title={'No listed orders'}
			/>
		);
	}

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

	return { orders: data.orders };
};

export default orders;
