import React, { useState, useEffect } from 'react';
import { Field, Button } from 'vant-react';
import AuthService from '../../service/auth';
import './index.scss';

let tick;
const ZERO = 0;
const SIXTY = 60;
const ONE_THOUSAND = 1000;

export default function SMSVerify({ phone, handleInputChange, values }) {
	const getSMSCode = async () => {
		try {
			const newPhone = `+1${phone}`;
			const getCodeResult = await AuthService.getSMSCode({ phone: newPhone });

			console.log(phone);
			if (getCodeResult.data.success === true) {
				setCountDown(true);
			} else {
				alert('Invalid phone number');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const [time, setTime] = useState(SIXTY);
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [btnContent, setBtnContent] = useState('Send Code');
	const [countDown, setCountDown] = useState(false);

	useEffect(() => {
		if (time > ZERO && time < SIXTY) {
			setBtnContent(`Resend after ${time}s`);
		} else {
			setBtnDisabled(false);
			setBtnContent('Send Code');
			setCountDown(false);
		}
	}, [time]);

	useEffect(() => {
		const getCountDownStarted = () => {
			setTime((t) => --t);
			setBtnDisabled(true);
		};

		if (countDown) {
			tick = setInterval(getCountDownStarted, ONE_THOUSAND);
		}
		return () => {
			clearInterval(tick);
			setTime(SIXTY);
		};
	}, [countDown]);

	return (
		<div className='sms-verify'>
			<Field
				placeholder='Verification Code'
				name='code'
				type='phone'
				value={values.code || ''}
				input={handleInputChange}
			/>

			<Button
				color='0000'
				fontColor='#000000'
				plain
				size='small'
				click={getSMSCode}
				type='primary'
				disabled={btnDisabled}
			>
				<div className='sms-content'>{btnContent}</div>
			</Button>
		</div>
	);
}
