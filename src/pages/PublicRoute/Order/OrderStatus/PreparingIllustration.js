import React from 'react';

import './PreparingIllustration.scss';

export default function PreparingIllustration({ orderStatus }) {
	return (
		<div className='order__status__content'>
			{orderStatus === 'Confirming' ? (
				<div
					className='order__status__content--image'
					style={{ backgroundImage: 'none' }}
				></div>
			) : orderStatus === 'Preparing' ? (
				<div className='order__status__content--image'>
					<img
						src='https://res.cloudinary.com/dmawkrb4t/image/upload/v1599175310/chef_1_pepebj.png'
						alt=''
					/>
				</div>
			) : (
				<div
					className='order__status__content--image'
					style={{ paddingLeft: '5px', paddingTop: '15px', alignSelf: 'end' }}
				>
					<img
						src='https://res.cloudinary.com/dmawkrb4t/image/upload/v1599175307/easter_meal_1_q6lvhz.png'
						alt=''
					/>
				</div>
			)}

			{orderStatus === 'Confirming' ? (
				<div
					className='order__status__content--text'
					style={{ backgroundImage: 'none' }}
				></div>
			) : orderStatus === 'Preparing' ? (
				<div className='order__status__content--text'>
					<p>Dishes on the way! The kitchan is preparing your food!</p>
				</div>
			) : (
				<div className='order__status__content--text'>
					<p>Enjoy your meal!</p>
				</div>
			)}
		</div>
	);
}
