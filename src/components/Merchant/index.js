import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './index.scss';

export default function Merchant({ merchantId }) {
	const [merchant, setMerchant] = useState({});

	const handleGetMerchantByMerchantId = (merchantId) => {
		return Axios.get('https://om.demo.bctc.io/merchants/merchant', {
			params: { merchantId },
		});
	};

	useEffect(() => {
		const fetchMerchantByMerchantId = async () => {
			const response = await handleGetMerchantByMerchantId(merchantId);

			setMerchant({ ...response.data.data });
		};

		fetchMerchantByMerchantId();
	}, [merchantId]);

	return (
		<div className='merchant-card-container'>
			<div className='merchant-card-logo-container'>
				<img src={merchant.logo} alt='logo' />
			</div>
			<div className='merchant-card-info-container'>
				<p>{merchant.name}</p>
			</div>
		</div>
	);
}
