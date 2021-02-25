import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';

import './index.scss';
import { Navbar } from 'vant-react';

export default function ReviewHistoryPage() {
	const page = 1;
	const sort = false;

	// const userId = window.localStorage.getItem('userId');
	const token = window.localStorage.getItem('token');
	const [reviews, setReviews] = useState([]);
	const userId = '5ef559c12e0cb20a6ffbd52b';

	useEffect(() => {
		const handleGetReviewsByUserId = ({ userId, page, sort }) => {
			return axios.get('https://om.demo.bctc.io/reviews/userId', {
				params: { userId, page, sort },
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		};
		const fetchReviews = async () => {
			const response = await handleGetReviewsByUserId({
				userId,
				page,
				sort,
			});

			setReviews(response.data.data.result);
		};

		fetchReviews();
	}, [token, sort, userId]);
	console.log(reviews);
	return (
		<div>
			<Navbar
				title='Reviews'
				leftIcon='arrow-left'
				leftText='Back'
				clickLeft={() => (window.location = '/profile')}
			/>
			{/* eslint-disable no-mixed-spaces-and-tabs */}
			<div className='reviews-container'>
				{reviews &&
          reviews.map((result) => (
          	<div key={result._id} className='review-card-container'>
          		<p>{result.text}</p>
          	</div>
          ))}
			</div>
		</div>
	);
}
