import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';

import './index.scss';
import { Navbar } from 'vant-react';

export default function OrderHistoryPage() {
	const ZERO = 0;
	const page = 1;
	const sort = false;

	// const userId = window.localStorage.getItem('userId');
	const token = window.localStorage.getItem('token');
	const [orders, setOrders] = useState([]);
	const userId = '5f0390235ad69a0a520c1090';

	useEffect(() => {
		const handleGetOrdersByUserId = ({ userId, page }) => {
			return axios.get('https://om.demo.bctc.io/orders/user', {
				params: { userId, page },
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		};
		const fetchOrders = async () => {
			const response = await handleGetOrdersByUserId({
				userId,
				page,
				sort,
			});

			setOrders(response.data.data.result);
		};

		fetchOrders();
	}, [userId, token, sort]);
	return (
		<div>
			<Navbar
				title='Orders'
				leftIcon='arrow-left'
				leftText='Back'
				clickLeft={() => (window.location = '/profile')}
			/>
			{/* eslint-disable no-mixed-spaces-and-tabs */}
			<div className='orders-container'>
				{orders &&
          orders.map((result) => (
          	<div key={result._id} className='order-card-container'>
          		<p>{result.date}</p>
          		<p>{result.merchantId[ZERO].name}</p>
          	</div>
          ))}
			</div>
		</div>
	);
}
