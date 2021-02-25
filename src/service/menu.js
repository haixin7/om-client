import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

const url = getAPIUrl();

const handleGetCategoryByMerchantId = (merchantId) => {
	return axios.get(`${url}/categories/merchant`, {
		params: { merchantId },
	});
};

const handleGetVariantsByMerchantId = (merchantId) => {
	return axios.get(`${url}/variants/merchant`, {
		params: { merchantId },
	});
};

const MenuServices = {
	handleGetCategoryByMerchantId,
	handleGetVariantsByMerchantId,
};

export default MenuServices;
