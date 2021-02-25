import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default function PageNotFound() {
	const imgUrl = 'https://res.cloudinary.com/dlapk94rx/image/upload/v1594763165/HTML-404-Page-with-SVG_r0qztr.png';

	return (
		<div className='PageNotFound'>
			<img src={imgUrl} alt=""/>
			<h1>Oops! That Page Can Not Be Found!</h1>
			<Link to='/' ><button><p>Go to explore page</p></button></Link>
		</div>
	);
}
