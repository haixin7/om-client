import React, { useState } from 'react';
import AuthServices from '../../../service/auth';
import SocialAuth from '../../../components/SocialAuth';
import './index.scss';
import { Link } from 'react-router-dom';

import { Field, Button } from 'vant-react';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
	let history = useHistory();
	const [values, setValues] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const newValues = { ...values, [name]: value };

		setValues(newValues);
	};
	const handleLogin = async () => {
		try {
			const { phone, password } = values;
			const loginResult = await AuthServices.handleLogin({
				phone,
				password,
			});

			console.log(loginResult.data);
			if (loginResult.data.success) {
				window.localStorage.setItem('token', loginResult.data.data);
				history.push('/');
			} else {
				alert(loginResult.data.data);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='login-page page '>
			<div>
				<h2>Log into </h2>
				<h2>your account</h2>
			</div>
			<div>
				<form onSubmit={(e) => e.preventDefault()} className='login-form'>
					<div className='input-field'>
						<div className='input-phone'>
							<Field
								name='phone'
								placeholder='Phone'
								type='phone'
								value={values.phone || ''}
								input={handleInputChange}
							/>
						</div>
						<div className='input-password'>
							<Field
								name='password'
								placeholder='Password'
								type='password'
								value={values.password || ''}
								input={handleInputChange}
							/>
						</div>
					</div>
					<div className='forgot-password'>
						<Link to='/password/forgot'>
							<p> Forgot password?</p>
						</Link>
					</div>
					<div className='signin-session'>
						<Button click={handleLogin} round type='info' color='F34647'>
              Sign In
						</Button>
					</div>
				</form>
			</div>
			<div className='social-buttons'>
				<SocialAuth />
				<div className='signup-link'>
					<Link to='/registration'>
						<p>
              Doesn’t have an account? <span>Sign Up</span>
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
