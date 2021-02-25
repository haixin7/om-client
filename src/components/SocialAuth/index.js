import React from 'react';

import GoogleLogin from 'react-google-login';
import SocialButton from './SocialButton';
import AuthServices from '../../service/auth';
import { useHistory } from 'react-router-dom';
import './index.scss';

export default function SocialAuth() {
	let history = useHistory();

	const responseGoogle = async (response) => {
		const password = response.googleId;
		const email = response.profileObj.email;
		const socialType = 'google';

		console.log(response);
		try {
			const socialLoginResult = await AuthServices.handleSocialSignup({
				email,
				password,
				socialType,
			});

			if (socialLoginResult.data.success) {
				window.localStorage.setItem('token', socialLoginResult.data.data.token);
				history.push('/');
			} else {
				alert(socialLoginResult.data.data.token);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const handleSocialLogin = async (user) => {
		const password = user.profile.id;
		const email = user.profile.email;
		const socialType = 'facebook';

		try {
			const socialLoginResult = await AuthServices.handleSocialSignup({
				email,
				password,
				socialType,
			});

			if (socialLoginResult.data.success) {
				window.localStorage.setItem('token', socialLoginResult.data.data.token);
				history.push('/');
			} else {
				alert(socialLoginResult.data.data.token);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const handleSocialLoginFailure = (err) => {
		console.error(err);
	};

	const facebookAppID = process.env.REACT_APP_FACEBOOK_APP_ID;
	const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

	return (
		<div className='social-auth'>
			<SocialButton
				provider='facebook'
				appId={facebookAppID}
				onLoginSuccess={handleSocialLogin}
				onLoginFailure={handleSocialLoginFailure}
				className='facebook-button'
			>
        Continue with Facebook
			</SocialButton>
			<GoogleLogin
				clientId={googleClientID}
				buttonText='Continue with Google'
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				className='google-button'
			/>
		</div>
	);
}
