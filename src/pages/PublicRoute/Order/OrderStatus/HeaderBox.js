import React, { useState, useEffect } from 'react';

import MerchantServices from '../../../../service/merchant';
import TableServices from '../../../../service/table';

import './HeaderBox.scss';

export default function HeaderBox({ merchantId, tableId }) {
	const [table, setTable] = useState({});
	const [merchant, setMerchant] = useState({});

	useEffect(() => {
		try {
			const fetchTable = async () => {
				const result = await TableServices.handleGetTable(tableId);

				if (result.data.success === true) {
					setTable(result.data.data);
				}
			};
			const fetchMerchant = async () => {
				const result = await MerchantServices.handleGetMerchantByMerchantId(
					merchantId,
				);

				if (result.data.success === true) {
					setMerchant(result.data.data);
				}
			};

			fetchMerchant();
			fetchTable();
		} catch (error) {
			alert(error);
		}
	}, [merchantId, tableId]);

	return (
		<div className='header__box__container'>
			<div className='header__block--merchant'>
				<h2>{merchant.name}</h2>
				<p>{merchant.description}</p>
			</div>
			<div className='header__block--table'>
				<p>{table.title}</p>
			</div>
		</div>
	);
}
