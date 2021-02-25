import React from 'react';

export default function MerchantDescription({ merchantInfo }) {
	return (
		<div className="description-wrapper">
			<div>Phone{merchantInfo.name}</div>
			<div>Pricing</div>
			<div>Cuisine</div>
			<div>Parking</div>
			<div>Dress Code</div>
			<div>Description</div>
		</div>
	);
}
