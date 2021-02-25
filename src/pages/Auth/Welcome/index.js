import React from 'react';
import { Button } from 'vant-react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function WelcomePage() {
	return (
		<div className='explore-page'>
			<div className='welcome-layout'>
				<div>
					<img
						src='https://openmenu-images.s3.amazonaws.com/OMfirstimg.svg'
						alt='firstpage'
					/>
				</div>
				<div>
					<h1>Welcome to Openmenu!</h1>
				</div>
			</div>
			<div className='signin-session'>
				<div className='signin-button'>
					<Link to='/login'>
						<Button round type='info' color='F34647'>
              Sign In
						</Button>
					</Link>
				</div>
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
