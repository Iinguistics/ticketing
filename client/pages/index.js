const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are logged in</h1>
	) : (
		<h1>You are not logged in</h1>
	);
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
	return {};
};

export default LandingPage;
