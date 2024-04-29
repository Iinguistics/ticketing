import Link from 'next/link';
import OrderService from '../../api/services/reads/OrderService';
import Table from '../../components/table';
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

	const headerList = ['Title', 'Status', 'View'];

	const bodyList = orders.map((order) => (
		<tr key={order.id}>
			<td>{order.ticketTitle}</td>
			<td>{order.status}</td>
			<td>
				<Link className='nav-link text-primary' href={`/orders/${order.id}`}>
					View Details
				</Link>
			</td>
		</tr>
	));

	return (
		<Table
			body={bodyList}
			headers={headerList}
			striped={true}
			title='My Orders'
		/>
	);
};

orders.getInitialProps = async (context, httpClient) => {
	return new OrderService({ httpClient }).getOrders();
};

export default orders;
