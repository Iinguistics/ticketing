import Link from 'next/link';

const header = ({ currentUser }) => {
	const links = [
		!currentUser && { label: 'Register', href: '/auth/register' },
		!currentUser && { label: 'Login', href: '/auth/login' },
		currentUser && { label: 'Logout', href: '/auth/logout' },
	]
		.filter((linkConfig) => linkConfig)
		.map(({ label, href }) => {
			return (
				<li key={href} className='nav-item'>
					<Link className='nav-link' href={href}>
						{label}
					</Link>
				</li>
			);
		});

	return (
		<nav className='navbar navbar-light bg-light'>
			<Link className='navbar-brand' href='/'>
				Event Tickets
			</Link>

			<div className='d-flex justify-content-end'>
				<ul className='nav d-flex align-items-center'>{links}</ul>
			</div>
		</nav>
	);
};

export default header;
