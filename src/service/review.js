import axios from 'axios';

const URL = 'https://om.demo.bctc.io';

const postReview = (value, count) => {
	return axios.post(`${URL}/reviews`, {
		userId: '123',
		merchantId: '123',
		text: value,
		rating: count,
	},
	);
};
const getReviews = () => {
	return axios.get(`${URL}/reviews/merchantId?merchantId=123&page=1`);
};

const reviewServices = {
	postReview, getReviews,
};

export default reviewServices;
