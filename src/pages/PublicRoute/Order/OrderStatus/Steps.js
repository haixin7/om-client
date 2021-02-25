import React from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

import './Steps.scss';

export default function Steps({ orderStatus }) {
	const steps = ['Confirming', 'Preparing', 'Serving', 'Finished'];

	return (
		<div className='order__status__steps--container'>
			<ul className='order__status__steps--progressbar'>
				{/* eslint-disable no-mixed-spaces-and-tabs */}
				{steps &&
          steps.map((step) => (
          	<li
          		key={shortid.generate()}
          		className={classnames(
          			`order__status__steps--step ${step.toLowerCase()}`,
          			{
          				isActive: orderStatus === step,
          			},
          		)}
          	>
          		<div className='order__status__steps--text'>
          			<p>{step}</p>
          		</div>
          		<div className='order__status__steps--progress'>
          			<hr className='progress__line left' />
          			<div className='order__status__steps--dot'>
          				<img
          					src='https://res.cloudinary.com/dmawkrb4t/image/upload/v1599218084/Fill_kovp4o.png'
          					alt='check'
          				/>
          			</div>
          			<hr className='progress__line right' />
          		</div>
          	</li>
          ))}
			</ul>
		</div>
	);
}
