import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderService from '../../../../service/order';
import shortid from 'shortid';

import './OrderCard.scss';

export default function OrderCard({ orderId, date, variant }) {
	const ZERO = 0;
	const TWO = 2;
	const [payment, setPayment] = useState();

	useEffect(() => {
		try {
			const fetchPayment = async () => {
				const response = await OrderService.handleGetPayment(orderId);

				if (response.data.success) {
					setPayment(response.data.data[ZERO]);
				}
			};

			fetchPayment();
		} catch (error) {
			alert(error);
		}
	}, [orderId]);

	return (
		<div className='order__card'>
			<div className='order__card--top'>
				<div className='order__card--upleft'>
					<div className='order__card--date'>
						<p>{date}</p>
					</div>
					<div className='order__card--items'>
						{/* eslint-disable no-mixed-spaces-and-tabs */}
						{variant &&
              variant.map(
              	(variant, i) =>
              		i < TWO && <p key={shortid.generate()}>{variant.title}</p>,
              )}
					</div>
				</div>
				<div className='order__card--upright'>
					{payment && (
						<p className='order__card--price'>{`$${payment.total.$numberDecimal}`}</p>
					)}
				</div>
			</div>
			<hr className='order__card--divider' />
			<div className='order__card--bottom'>
				<Link to='#' className='order__card--link'>
          What did I order
				</Link>
			</div>
		</div>
	);
}
