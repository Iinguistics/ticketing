import buildClient from '../api/build-client';
import urls from '../api/urls';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are logged in</h1>
	) : (
		<h1>You are not logged in</h1>
	);
};

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get(urls.authSrv.current);

	return data;
};

export default LandingPage;
