const apiSegment = 'api';
const apiVersion = 'v1';
const baseApiUrl = `/${apiSegment}/${apiVersion}`;
const baseUsersUrl = `${baseApiUrl}/users`;

export default {
	authSrv: {
		current: `${baseUsersUrl}/current`,
		login: `${baseUsersUrl}/login`,
		logout: `${baseUsersUrl}/logout`,
		register: `${baseUsersUrl}/register`,
	},
};
