import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

const url = getAPIUrl();

const handleGetCurrentUser = (token) => {
	return axios.post(
		`${url}/users/current`,

		{
			params: {},
			headers: {
				authorization: `Bearer ${token}`,
			},
		},
	);
};

const UserServices = {
	handleGetCurrentUser,
};

export default UserServices;
