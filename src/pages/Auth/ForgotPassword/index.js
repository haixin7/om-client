import React, { useState } from 'react';
import './index.scss';

import { Field, Button } from 'vant-react';
import { useHistory } from 'react-router-dom';
import SMSVerify from '../../../components/SMSverify';
import AuthServices from '../../../service/auth';

export default function ForgotPasswordPage() {
	let history = useHistory();
	const [values, setValues] = useState({});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const newValues = { ...values, [name]: value };

		console.log(newValues);
		setValues(newValues);
	};

	const handleChangePassword = async () => {
		try {
			const { phone, password, code } = values;
			const newPhone = `+1${phone}`;
			const verifySMSResult = await AuthServices.verifySMSCode({
				phone: newPhone,
				code,
			});

			if (verifySMSResult.data.data.valid === true) {
				const resetPassword = await AuthServices.resetUserPassword({
					phone,
					password,
				});

				if (resetPassword.data.success === true) {
					history.push('/login');
				} else {
					alert('This phone number has never been registered');
				}
			} else {
				alert('Please enter the correct verification code');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='resetpassword-page page'>
			<div>
				<h2>Reset Password</h2>
			</div>
			<div>
				<form
					onSubmit={(e) => e.preventDefault()}
					className='resetpassword-form'
				>
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
								values={values || ''}
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
						<div className='changepassword-session'>
							<Button
								click={handleChangePassword}
								round
								type='info'
								color='F34647'
							>
                Change Password
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
