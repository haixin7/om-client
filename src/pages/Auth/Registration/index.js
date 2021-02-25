import React, { useState } from 'react';
import './index.scss';

import { Field, Button, Checkbox } from 'vant-react';

import { useHistory } from 'react-router-dom';
import AuthServices from '../../../service/auth';
import SocialAuth from '../../../components/SocialAuth';
import SMSVerify from '../../../components/SMSverify';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
	let history = useHistory();
	const [values, setValues] = useState({});
	const [isDisabled, setDisabled] = useState(true);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({ ...values, [name]: value });
	};

	const handleAccept = () => {
		setDisabled(!isDisabled);
	};

	/* eslint-disable-next-line max-statements */
	const handleSubmit = async () => {
		try {
			const { phone, password, code } = values;
			const newPhone = `+1${phone}`;
			const verifySMSResult = await AuthServices.verifySMSCode({
				phone: newPhone,
				code,
			});

			if (verifySMSResult.data.data.valid === true) {
				const registerResult = await AuthServices.handleRegister(values);

				if (registerResult.data.success) {
					const loginResult = await AuthServices.handleLogin({
						phone,
						password,
					});

					if (loginResult.data.success) {
						const token = loginResult.data.data;

						window.localStorage.setItem('token', token);
						history.push('/');
					} else {
						alert('Something went wrong during login');
					}
				} else {
					alert('Something went wrong during register');
				}
			} else {
				alert('Please enter the correct verification code');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='register-page page'>
			<div>
				<h2>Create your</h2>
				<h2>account</h2>
			</div>
			<div>
				<form onSubmit={(e) => e.preventDefault()} className='register-form'>
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
						<div className='input-smscode'>
							<SMSVerify
								phone={values.phone}
								handleInputChange={handleInputChange}
								values={values}
							/>
						</div>
						<div className='input-username'>
							<Field
								name='userName'
								type='text'
								value={values.userName || ''}
								input={handleInputChange}
								placeholder='User Name'
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
					<div className='privacy-terms'>
						<Checkbox name='acceptedTerms' clicked={handleAccept} />
						<div>
							<p>
                I accept the
								<Link to='/privacy'>
									<span> privacy </span>
								</Link>
                and
								<Link to='/terms'>
									<span> terms</span>
								</Link>
                .
							</p>
						</div>
					</div>
					<div className='signup-session'>
						<Button
							click={handleSubmit}
							disabled={isDisabled}
							round
							type='info'
							color='F34647'
						>
              Sign Up
						</Button>
					</div>
				</form>
			</div>
			<div className='social-buttons'>
				<SocialAuth />
				<div className='signin-link'>
					<Link to='/login'>
						<p>
              Already have an account? <span>Sign In</span>
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
