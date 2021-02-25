import React, { useState, useEffect } from 'react';
import orderConstant from '../../../../constants/order';
import './index.scss';
import shortid from 'shortid';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Popup, Button } from 'vant-react';
import OrderService from '../../../../service/order';
/* eslint max-statements: ["error", 30]*/
export default function OrderConfirmationPage({ history }) {
	console.log(history);
	const INICIALSTATE = 0;
	const DECIMALS = 2;
	const CENTTODOLLAR = 100;
	const AMOUNT = 1;
	const order = history.location.state.cartList;

	const userId = '5ef279d36f1af27051f0885f';
	const merchantId = history.location.state.merchant.merchantId;
	const merchant = history.location.state.merchant.name;
	const merchantInf = history.location.state.merchant;
	const tableId = '5efb97ec0b22a850128acc18';
	const [subtotal, setSubtotal] = useState(INICIALSTATE);
	const [tax, setTax] = useState(INICIALSTATE);
	const [discount, setDiscount] = useState(INICIALSTATE);
	const [total, setTotal] = useState('');
	const [product, setProduct] = useState({
		name: null,
		price: null,
		merchantName: null,
		merchantId: null,
		tableId: null,
		type: 'DINEIN',
	});
	const [payPopup, setPayPopup] = useState(false);
	const [failPopup, setFailPopup] = useState(false);
	const [confirmation, setConfirmation] = useState({
		orderId: null,
		merchantId: null,
		paymentId: null,
		orderInf: null,
	});
	const [variantId, setVariantId] = useState([]);

	useEffect(() => {
		const calculate = () => {
			/* eslint no-mixed-spaces-and-tabs: "error"*/
			const sub = order.map((v) => v && (v.itemQuantity * v.price));
			const sum = Number(
				sub.reduce((prev, current) => {
					return prev + current;
				}),
			).toFixed(DECIMALS);

			const dis = Number(orderConstant[DECIMALS].value).toFixed(DECIMALS);
			const ta = Number(subtotal * Number(orderConstant[AMOUNT].value)).toFixed(
				DECIMALS,
			);
			const tot = Number(
				Number(subtotal) + Number(tax) - Number(discount),
			).toFixed(DECIMALS);

			setSubtotal(sum);
			setTax(ta);
			setDiscount(dis);
			setTotal(tot);
		};

		calculate();
	}, [order, subtotal, tax, discount]);

	useEffect(() => {
		const getProduct = () => {
			product.name = merchant;
			product.price = total;
			product.merchantName = merchant;
			product.merchantId = merchantId;
			product.tableId = tableId;
			setProduct(product);
		};

		getProduct();
	}, [merchant, total, product, merchantId]);

	const makePayment = async (token) => {
		// const response = await axios.post('http://localhost:3005/stripe/checkout', {
		//   token,
		//   product,
		// });
		// console.log(response);
		const response = await axios.post(
			'https://om.demo.bctc.io/stripe/checkout',
			{
				token,
				product,
			},
		);

		console.log(response);
		// eslint-disable-next-line no-unused-vars
		if (response.data.data.captured) {

			const orderData = await OrderService.handleCreateOrder(
				userId,
				product.merchantId,
				product.tableId,
				product.type,
				variantId,

			);

			console.log(orderData);

			const result = await OrderService.handleCreatePayment(
				userId,
				orderData.data.data._id,
				product.merchantId,
				product.tableId,
				tax,
				total,
				response.data.data.id,
				response.data.data.customer,
			);

			confirmation.merchantId = product.merchantId;
			confirmation.orderId = orderData.data.data._id;
			confirmation.paymentId = result.data.data._id;
			confirmation.orderInf = order;
			setConfirmation({ ...confirmation });
			console.log(result);
			history.history.push('/order/status', {confirmation, merchantInf});
		} else {
			(() => setFailPopup(!failPopup))();
		}
	};
	const handlePopup = () => {
		setPayPopup(!payPopup);
		const temp = [];

		for (let i = 0; i < order.length; i++) {
			if (order[i]) {

				temp.push({title: order[i].title, price: order[i].price, amount: order[i].itemQuantity, isDone: false});
			}
		}
		console.log(temp);
		setVariantId(temp);
	};
	const handleToCart = () => {
		history.history.push(`/merchant/${merchantId}/menu`, order);
	};

	// const handleSplitBill = () => {
	// 	history.history.push(`/merchant/${merchant}/${table}/split/${total}`, [
	// 		userId,
	// 	]);
	// };

	return (
		<div className='order-confirmation-container'>
			<div className='order-header'>
				<img src="https://res.cloudinary.com/dlapk94rx/image/upload/v1600391951/ICONS/png/Path_lpfru3.png" onClick={handleToCart} alt=""/>
				<h2>Checkout</h2>
				<div></div>
			</div>
			<hr />
			<div className='order-merchant-information'>
				<h2>{merchant}</h2>
				<p> Table </p>
			</div>
			<hr/>
			<div className='order-detail-container'>
				{
					/* eslint no-mixed-spaces-and-tabs: "error"*/
					order &&
					order.map((v) => (
						v && (
							<div className='order-detail' key={shortid.generate()}>
								<div className='item-quantity'>
									<p>{v.itemQuantity}</p>
								</div>
								<div>
									<h3>{v.title}</h3>
								</div>
								<div>
									<p>${v.itemQuantity * v.price}.00</p>
								</div>
							</div>
						)

					))
				}
			</div>
			<hr/>
			<div className='order-footer'>
				<div>
					<h3>Subtotal</h3>
					<h2>${subtotal}</h2>
				</div>
				<div>
					<h3>Tax</h3>
					<h2>${tax}</h2>
				</div>
				<div>
					<h3>Discounts</h3>
					<h2 className='discount'>-${discount}</h2>
				</div>
				<hr />
				<div className='total'>
					<h3>Total</h3>
					<h2>${total}</h2>
				</div>
			</div>
			<div className='order-payment'>
				<div>
					{discount > INICIALSTATE ? (
						<h2>You saved ${discount}</h2>
					) : (
						<div></div>
					)}
				</div>
			</div>
			{/* <div className='split-bill'>
				<h2>Split Bill</h2>
				<button onClick={handleSplitBill}>
					<img
						src='https://res.cloudinary.com/dlapk94rx/image/upload/v1596236609/icons8-plus-64_xtmuj5.png'
						alt=''
					/>
				</button>
			</div> */}
			<div className='next'>
				<Button type='info' click={handlePopup}>
					<h2>Proceed to Payment</h2>
				</Button>
			</div>
			<Popup
				type='bottom'
				size={{ width: '100%', height: '200px' }}
				isActive={payPopup}
				setActive={setPayPopup}
				content={
					<StripeCheckout
						className='pay'
						stripeKey='pk_test_51H0CRUJnXiAyp60wDW8aOR5iBDpVqMMwDwi9gGt7vBdPHfSJQsPomZYFE9Uo6WaE9t6NU70RMpU0p6stkMCzqDu800i9LWKcXr'
						token={makePayment}
						name={merchant}
						amount={total * CENTTODOLLAR}
						currency='USD'
						zipCode

						//   alipay
						description='Example charge'
						image='https://res.cloudinary.com/dlapk94rx/image/upload/v1590175148/icons8-github-120_lvx8aa.png'

						// billingAddress
					/>
				}
			/>
			<Popup
				type='bottom'
				size={{ width: '100%', height: '200px' }}
				isActive={failPopup}
				setActive={setFailPopup}
				content={
					<div className='order-fail'>
						<h2>Oops! Something Wrong With Your Payment</h2>
						<Button
							text='Pay agin'
							type='primary'
							click={() => {
								setFailPopup(!failPopup);
								setPayPopup(true);
							}}
						></Button>
					</div>
				}
			/>
		</div>
	);
}
