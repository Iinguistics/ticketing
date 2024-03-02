import { useEffect } from 'react';
import Router from 'next/router';
import urls from '../../api/urls';
import useRequest from '../../hooks/use-request';

const logout = () => {
	const { doRequest } = useRequest({
		url: urls.authSrv.logout,
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	});

	useEffect(() => {
		doRequest();
	}, []);

	return <div>Logging you out...</div>;
};

export default logout;
