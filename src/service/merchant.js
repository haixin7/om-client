import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

const URL = getAPIUrl();

const handleGetMerchantInfoByMerchantName = (merchantName) => {
	return axios.get(`${URL}/merchants/merchant`, {
		params: {
			merchantId: merchantName,
		},
	});
};

const handleGetMerchantByMerchantId = (merchantId) => {
	return axios.get(`${URL}/merchants/merchant`, {
		params: {
			merchantId,
		},
	});
};

const MerchantServices = {
	handleGetMerchantInfoByMerchantName,
	handleGetMerchantByMerchantId,
};

export default MerchantServices;
