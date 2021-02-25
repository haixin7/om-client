import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

// const url = 'https://om.demo.bctc.io';

const url = getAPIUrl();

const handleCreateOrder = (userId, merchantId, tableId, type, variantId) => {
	return axios.post(`${url}/orders`, {
		userId,
		merchantId,
		tableId,
		type,
		variantId,
	});
};
/* eslint max-params: ["error", 10]*/
const handleCreatePayment = (
	userId,
	orderId,
	merchantId,
	tableId,
	tax,
	total,
	chargeId,
	stripeId,
) => {
	return axios.post(`${url}/stripe/payment`, {
		userId,
		orderId,
		merchantId,
		tableId,
		tax,
		total,
		chargeId,
		stripeId,
	});
};

const handleGetOrder = (orderId) => {
	return axios.get(`${url}/orders/order`, {
		params: {
			orderId,
		},
	});
};

const handleGetPayment = (orderId) => {
	return axios.get(`${url}/payments/order`, {
		params: {
			orderId,
		},
	});
};

const OrderService = {
	handleCreateOrder,
	handleCreatePayment,
	handleGetOrder,
	handleGetPayment,
};

export default OrderService;
