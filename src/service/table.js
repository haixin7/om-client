import axios from 'axios';
import getAPIUrl from '../constants/apiUrl';

const URL = getAPIUrl();

const handleGetTable = (tableId) => {
	return axios.get(`${URL}/tables`, {
		params: {
			tableId,
		},
	});
};

const TableServices = {
	handleGetTable,
};

export default TableServices;
