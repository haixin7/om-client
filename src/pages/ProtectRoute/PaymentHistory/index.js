import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';

import './index.scss';
import { Navbar } from 'vant-react';

export default function ReviewHistoryPage() {
	const page = 1;
	const ZERO = 0;

	// const userId = window.localStorage.getItem('userId');
	const token = window.localStorage.getItem('token');
	const [payments, setPayments] = useState();
	const userId = '5f0390235ad69a0a520c1090';

	useEffect(() => {
		const handleGetPaymentsByUserId = ({ userId, page }) => {
			return axios.get('https://om.demo.bctc.io/payments/user', {
				params: { userId, page },
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		};
		const fetchPayments = async () => {
			const response = await handleGetPaymentsByUserId({
				userId,
				page,
			});

			console.log(response);
			setPayments(response.data.data.result);
		};

		fetchPayments();
	}, [userId, token]);
	console.log(payments);
	return (
		<div>
			<Navbar
				title='Payments'
				leftIcon='arrow-left'
				leftText='Back'
				clickLeft={() => (window.location = '/profile')}
			/>
			{/* eslint-disable no-mixed-spaces-and-tabs */}
			<div className='payments-container'>
				{payments &&
          payments.map((result) => (
          	<div key={result._id} className='payment-card-container'>
          		<p>{result.date}</p>
          		<p>{result.merchantId[ZERO].name}</p>
          		<p>{`$${result.total}`}</p>
          	</div>
          ))}
			</div>
		</div>
	);
}
