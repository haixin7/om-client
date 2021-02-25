import React from 'react';

// import { useEffect } from 'react';
import { Rate } from 'vant-react';
import 'vant-react/dist/index.css';

// import axios from 'axios';
const FIRST_INDEX = 0;

export default function Review({ comment }) {
	// console.log(comment);

	// to-do: get User Info by userId
	// useEffect(() => {
	//     // const getUser = async()=>{
	//     //     try{
	//     //         const result = await axios.get('')
	//     //     }catch(e){

	//     //     }
	//     // }
	// }, [])
	// console.log(Object.values(comment.rating)[0]);
	const rating = Object.values(comment.rating)[FIRST_INDEX];

	return (

		// to-do better layout
		<div className="past-review-container">
			<Rate count={10} currentRate={rating} readonly />
			<p>{comment.text}</p>
		</div>
	);
}
