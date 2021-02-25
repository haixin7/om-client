import React from 'react';
import shortid from 'shortid';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './index.scss';

export default function ImageDisplay({ images }) {
	return (
		<div className="image-wrapper">
			<Carousel className="carousel-container" showThumbs={false}>
				{
					images.map((image) => (
						<div key={shortid.generate()}>
							<img src={image} alt="merchant" />
						</div>
					))
				}
			</Carousel>
		</div>
	);
}
