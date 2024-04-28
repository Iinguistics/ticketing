import { useEffect, useState } from 'react';
import { STRIPE_CHECKOUT_KEY } from '../../config/stripe';
import OrderService from '../../api/services/reads/OrderService';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import urls from '../../api/urls';

const show = ({ currentUser, order }) => {
	const [timeLeft, setTimeLeft] = useState(0);

	const { doRequest, errors } = useRequest({
		url: urls.paymentsSrv.create,
		method: 'post',
		body: {
			order_id: order.id,
		},
		onSuccess: () => Router.push('/orders'),
	});

	useEffect(() => {
		const findTimeLeft = () => {
			const msLeft = new Date(order.expiresAt) - new Date();
			setTimeLeft(Math.round(msLeft / 1000));
		};

		findTimeLeft();
		const timerId = setInterval(findTimeLeft, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	if (timeLeft < 0) {
		return (
			<div>
				<h5>Order reservation has expired</h5>
			</div>
		);
	}

	return (
		<div>
			<h5>Time left to pay: {timeLeft} seconds</h5>
			<p className='text-muted'>{order.ticketTitle}</p>
			<p className='text-muted'>${order.ticketPrice}</p>
			<StripeCheckout
				amount={order.ticket_price * 100}
				email={currentUser.email}
				token={(token) => doRequest({ token: token.id })}
				stripeKey={STRIPE_CHECKOUT_KEY}
			/>
			{errors}
		</div>
	);
};

show.getInitialProps = async (context, httpClient) => {
	const { orderId } = context.query;
	return new OrderService({ httpClient }).getById(orderId);
};

export default show;
