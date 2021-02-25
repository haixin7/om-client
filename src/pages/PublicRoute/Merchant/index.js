import React from 'react';
import { useState, useEffect } from 'react';
import shortid from 'shortid';
import MerchantServices from '../../../service/merchant';

import ImageDisplay from '../../../components/ImageDisplay';

import LocationMap from '../../../components/LocationMap';
import MerchantDescription from '../../../components/MerchantDescription';
import { Link } from 'react-router-dom';

import { Button } from 'vant-react';

import QRcode from '../../../components/QRcode';

import './index.scss';

const DEFAULT_PAGE = 1;
const OFFSET = 1;
const FIRST_INDEX = 0;

export default function MerchantPage({ match }) {
	const merchantName = match.match.params.name;
	const [merchantInfo, setMerchantInfo] = useState({});
	const [coordinates, setCoordinates] = useState([]);
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [images, setImages] = useState([]);
	const [numbers, setNumbers] = useState([]);

	useEffect(() => {
		const handleGetMerchantInfo = async () => {
			try {
				const response = await MerchantServices.handleGetMerchantInfoByMerchantName(
					merchantName,
				);

				setMerchantInfo({ ...response.data.data });
				setCoordinates([...response.data.data.location.coordinates]);
				setImages([...response.data.data.images]);
				setNumbers([...response.data.data.tel]);
			} catch (e) {
				alert(e);
			}
		};

		handleGetMerchantInfo();
	}, [merchantName]);

	const handleChangePage = (index) => {
		setPage(index + OFFSET);
	};
	const merchantPages = [
		{
			title: 'Description',
			component: <MerchantDescription merchantInfo={merchantInfo} />,
		},
		{ title: 'Reviews', component: 2 },
		{ title: 'Open Hours', component: 3 },
		{ title: 'Menu', component: 4 },
	];

	return (
		<div className='merchant-page-wrapper'>
			<ImageDisplay images={images} />
			<div className='merchant-text'>
				<h4>{merchantInfo.name}</h4>
			</div>
			<LocationMap coordinates={coordinates} />
			<div className='toggle-page-wrapper'>
				<div className='toggle-head'>
					{merchantPages.map((constant, index) => (
						<div
							key={shortid.generate()}
							onClick={() => handleChangePage(index)}
						>
							{constant.title}
						</div>
					))}
				</div>
				<div className='toggle-page'>
					{merchantPages.map(
						(constant, index) =>
							page === index + OFFSET && (
								<div key={shortid.generate()}>{constant.component}</div>
							),
					)}
				</div>
			</div>
			<div className='merchant-buttons'>
				<Button
					text='Call Now'
					click={() => window.open(`tel:${numbers[FIRST_INDEX]}`)}
				/>
				<Link to={{ pathname: '/order/confirmation', state: { name: '123' } }}>
					<Button text='Place an Order' />
				</Link>
			</div>
			<div>
				<QRcode />
			</div>
		</div>
	);
}
