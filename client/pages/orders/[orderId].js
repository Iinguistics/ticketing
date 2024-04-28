import { useEffect, useState } from 'react';
import { STRIPE_CHECKOUT_KEY } from '../../config/stripe';
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
			const msLeft = new Date(order.expires_at) - new Date();
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

show.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`${urls.ordersSrv.show}/${orderId}`);

	return { order: data.order };
};

export default show;
