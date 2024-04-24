import { useState, useEffect } from 'react';
import Router from 'next/router';
import urls from '../../api/urls';
import useRequest from '../../hooks/use-request';

const login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: urls.authSrv.login,
		method: 'post',
		body: {
			email,
			password,
		},
		onSuccess: () => Router.push('/'),
	});

	const handleOnSubmit = async (event) => {
		event.preventDefault();

		await doRequest();
	};

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleOnSubmit}>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email Address
					</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='form-control'
						id='email'
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						className='form-control'
						id='password'
					/>
				</div>
				{errors}
				<button type='submit' className='btn btn-primary'>
					Login
				</button>
			</form>
		</>
	);
};

export default login;
