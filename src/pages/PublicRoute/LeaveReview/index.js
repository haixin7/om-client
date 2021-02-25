import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'vant-react';
import { Rate } from 'vant-react';
import reviewServices from '../../../service/review';

import './index.scss';

const INITIAL_COUNT = 0;

export default function LeaveReviewPage() {
	const [value, setValue] = useState('');
	const [count, setCount] = useState(INITIAL_COUNT);
	const handleTextChange = (e) => {
		setValue(e.target.value);
	};
	const [commentList, setComment] = useState([]);

	useEffect(() => {
		const getMerchantReviews = async () => {
			try {
				const response = await reviewServices.getReviews();

				setComment(response.data.data.result);
			} catch (e) {
				alert(e);
			}
		};

		getMerchantReviews();
	}, [commentList]);

	const handleRate = (activeCount) => {
		setCount(activeCount);
	};

	const handleReviewSubmit = async () => {
		const result = await reviewServices.postReview(value, count);

		if (result.data.success) {
			const nextCommentList = [...commentList];

			nextCommentList.push(result.data.data);
			setComment(nextCommentList);
		}
	};

	return (
		<div className="page-wrapper">
			<div className="review-wrapper">
				<h1>123</h1>
				<Rate count={10} change={(activeCount) => {handleRate(activeCount);}} />
				<form action="" onSubmit={(e) => e.preventDefault()}>
					<textarea placeholder="Leave your comment here" name="" id="" cols="40" rows="20" onChange={(e) => handleTextChange(e)}></textarea>
					<Button type='danger' hariLine='primary' click={handleReviewSubmit} text='Post Review' />
				</form>
			</div>
		</div>
	);
}
