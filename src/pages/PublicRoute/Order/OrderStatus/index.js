import React, { useState, useEffect } from 'react';
import './index.scss';
import { Navbar } from 'vant-react';

import { Link } from 'react-router-dom';
import OrderService from '../../../../service/order';
import io from 'socket.io-client';

import HeaderBox from './HeaderBox';
import FooterNav from '../../../../components/FooterNav';
import OrderCard from './OrderCard';
import PreparingIllustration from './PreparingIllustration';
import Steps from './Steps';

export default function OrderStatusPage({ history }) {
	// const confirmation = {
	// 	orderId: '5f5191260a8ea36332d1a78b',
	// };

	const confirmation = {
		orderId: history.location.state.confirmation.orderId,
	};

	console.log(history.location.state);
	const merchantInf = history.location.state.merchantInf;
	const url = 'https://om.demo.bctc.io';
	const [order, setOrder] = useState();
	const [status, setStatus] = useState();
	const socket = io(url);

	console.log(order);

	useEffect(() => {
		socket.on('order', (data) => {
			if (data.order.status.order === confirmation.orderId) {
				setStatus(data.order.status.status);
			}
		});
		socket.on('news', (data) => {
			console.log(data);
		});
	});
	useEffect(() => {
		const handleGetOrder = async () => {
			const result = await OrderService.handleGetOrder(confirmation.orderId);

			console.log(result);
			if (result.data.success === true) {
				setOrder(result.data.data);
				setStatus(result.data.data.status);
			}
		};

		handleGetOrder();
	}, [confirmation.orderId]);

	return (
		<div className='order__status__page'>
			<div className='nav--container'>
				<Navbar title='Order Status' leftIcon='arrow-left' />
			</div>
			{order && (
				<div className='order__status--container'>
					<HeaderBox merchantId={merchantInf.merchantId} tableId={merchantInf.tableId} />
					<Steps orderStatus={status} />
					{status === 'Finished' ? (
						<div className='order__status__finished--container'>
							<p>Let us know how we&rsquo;re doing!</p>
						</div>
					) : (
						<div>
							<PreparingIllustration orderStatus={status} />
							<OrderCard
								orderId={order._id}
								date={order.date}
								variant={order.variantId}
							/>
							<div className='add__dishes--container'>
								<Link to='#' className='add__dishes--text'>
                  Add Dishes
								</Link>
							</div>
						</div>
					)}
				</div>
			)}

			<div className='bottom__nav--container'>
				<FooterNav history={history} />
			</div>
		</div>
	);
}
