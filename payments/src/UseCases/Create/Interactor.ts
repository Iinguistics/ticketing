import {
	BadRequestError,
	Id,
	NotAuthorizedError,
	NotFoundError,
	OrderStatus,
} from '@jmsgoytia-ticketing/common';
import { natsWrapper } from '../../NatsWrapper';
import CreateRequest from './CreateRequest';
import CreateResponse from './CreateResponse';
import Interactor from '../Interactor';
import OkHttpPresenter from '../../Presenters/OkPresenter';
import Order from '../../Entities/Order';
import OrderRepository from '../../Repositories/OrderRepository';
import PaymentCreatedPublisher from '../../events/publishers/PaymentCreatedPublisher';
import PaymentRepository from '../../Repositories/PaymentRepository';
import StripeGateway from '../../Gateways/Stripe/StripeGateway';

class CreateInteractor extends Interactor {
	#orderRepository;
	#paymentRepository;
	#stripeGateway;

	constructor() {
		super(OkHttpPresenter);
		this.#orderRepository = OrderRepository;
		this.#paymentRepository = PaymentRepository;
		this.#stripeGateway = StripeGateway;
	}

	async _execute(req: CreateRequest): Promise<CreateResponse> {
		const order = await this.#getOrderById(new Id(req.orderId));

		CreateInteractor.#checkOrder(order, new Id(req.userId));

		const stripeCharge = await this.#stripeGateway.create({
			amount: order.price,
			paymentMethod: req.token,
		});

		const paymentDocument = await this.#paymentRepository.create({
			order_id: order.id.value,
			stripe_id: stripeCharge.id,
		});

		new PaymentCreatedPublisher(natsWrapper.client).publish({
			email: req.userEmail,
			id: paymentDocument.id,
			orderId: paymentDocument.order_id,
			stripeId: paymentDocument.stripe_id,
		});

		return { id: paymentDocument.id, stripeId: paymentDocument.stripe_id };
	}

	static #checkOrder(order: Order, otherId: Id): void {
		if (!order.userId.equals(otherId)) {
			throw new NotAuthorizedError();
		}

		if (order.status === OrderStatus.Cancelled) {
			throw new BadRequestError('Cannot pay for a cancelled order');
		}
	}

	async #getOrderById(id: Id): Promise<Order> {
		const order = await this.#orderRepository.getById(id);

		if (!order) {
			throw new NotFoundError();
		}

		return order;
	}
}

export default new CreateInteractor();
