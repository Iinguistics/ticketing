import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import urls from '../api/urls';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div className='container'>
			<Header currentUser={currentUser} />
			<div className='my-4'>
				<Component {...pageProps} currentUser={currentUser} />
			</div>
		</div>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get(urls.authSrv.current);

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			data.currentUser
		);
	}

	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
