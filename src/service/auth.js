import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

const url = getAPIUrl();

const handleRegister = (values) => {
	return axios.post(`${url}/auth/user/signup`, values);
};

const handleLogin = ({ phone, password }) => {
	return axios.post(`${url}/auth/user/login`, {
		phone,
		password,
	});
};

const handleSocialSignup = ({ email, password, socialType }) => {
	return axios.post(`${url}/auth/media/signup`, {
		email,
		password,
		socialType,
	});
};

const getSMSCode = ({ phone: newPhone }) => {
	return axios.post(`${url}/twilio`, { phone: newPhone });
};

const verifySMSCode = ({ phone: newPhone, code }) => {
	return axios.post(`${url}/twilio/verify`, {
		phone: newPhone,
		code,
	});
};

const resetUserPassword = ({ phone, password }) => {
	return axios.post(`${url}/auth/user/password`, {
		phone,
		password,
	});
};

const AuthServices = {
	handleRegister,
	handleLogin,
	handleSocialSignup,
	getSMSCode,
	verifySMSCode,
	resetUserPassword,
};

export default AuthServices;
