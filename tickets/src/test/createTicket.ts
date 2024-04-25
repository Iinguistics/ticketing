import app from '../app';
import prefix from '../routes/prefix';
import request from 'supertest';

export const ticketData = {
	city: 'San Diego',
	date: '2024-04-25T12:00:00',
	postal_code: '92071',
	state: 'ca',
	street_address: '1234',
	price: 20,
	title: 'concert',
};

function createTicket(){
	return request(app)
		.post(`${prefix}/tickets`)
		.set('Cookie', global.login())
		.send(ticketData);
};

export default createTicket;