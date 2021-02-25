import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Merchant from '../../../components/Merchant';
import { Link } from 'react-router-dom';

import './index.scss';
import { Navbar } from 'vant-react';

export default function FavoriteRestaurantsPage() {
	const page = 1;

	const userId = window.localStorage.getItem('userId');
	const token = window.localStorage.getItem('token');
	const [favMerchants, setFavMerchants] = useState([]);

	useEffect(() => {
		const handleGetFavMerchants = ({ userId, page }) => {
			return axios.get('https://om.demo.bctc.io/users/favorites/review', {
				params: { userId, page },
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		};
		const fetchFavMerchants = async () => {
			const response = await handleGetFavMerchants({ userId, page });

			setFavMerchants(response.data.data.result);
		};

		fetchFavMerchants();
	}, [userId, token]);

	console.log(favMerchants);

	return (
		<div>
			<Navbar
				title='Favorites'
				leftIcon='arrow-left'
				leftText='Back'
				clickLeft={() => (window.location = '/profile')}
			/>
			{/* eslint-disable no-mixed-spaces-and-tabs */}
			<div className='merchants-container'>
				{favMerchants &&
          favMerchants.map((result) => (
          	<div key={result.merchantList.merchantId}>
          		<Link to={`/merchant/${result.merchantList.merchantId}`}>
          			<Merchant merchantId={result.merchantList.merchantId} />
          		</Link>
          	</div>
          ))}
			</div>
		</div>
	);
}
