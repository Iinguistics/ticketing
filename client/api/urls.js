const apiSegment = 'api';
const apiVersion = 'v1';
const baseApiUrl = `/${apiSegment}/${apiVersion}`;
const baseOrdersUrl = `${baseApiUrl}/orders`;
const basePaymentsUrl = `${baseApiUrl}/payments`;
const baseTicketsUrl = `${baseApiUrl}/tickets`;
const baseUsersUrl = `${baseApiUrl}/users`;

export default {
	authSrv: {
		current: `${baseUsersUrl}/current`,
		login: `${baseUsersUrl}/login`,
		logout: `${baseUsersUrl}/logout`,
		register: `${baseUsersUrl}/register`,
	},
	ordersSrv: {
		create: `${baseOrdersUrl}`,
		orders: `${baseOrdersUrl}`,
		show: `${baseOrdersUrl}`,
	},
	paymentsSrv: {
		create: `${basePaymentsUrl}`,
	},
	ticketSrv: {
		create: `${baseTicketsUrl}`,
		show: `${baseTicketsUrl}`,
		tickets: `${baseTicketsUrl}`,
	},
};
