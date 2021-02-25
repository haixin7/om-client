import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.scss';

export default function ProfilePage() {
	const token = window.localStorage.getItem('token');

	const [user, setUser] = useState({});
	const [orders, setOrders] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const handleGetCurrentUser = () => {
			return axios.get('https://om.demo.bctc.io/users/current', {
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		};
		const fetchUser = async () => {
			const response = await handleGetCurrentUser();

			setUser(response.data.data);
		};

		fetchUser();
	}, [token]);

	useEffect(() => {
		const handleGetOrdersByUserId = ({ userId, page }) => {
			return axios.get(
				'https://om.demo.bctc.io/orders',
				{ params: { userId, page } },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			);
		};
		const fetchOrders = async () => {
			const response = await handleGetOrdersByUserId({
				userId: user._id,
				page: 1,
			});

			setOrders(response.data.data.result);
		};

		fetchOrders();
	}, [user._id, token]);

	useEffect(() => {
		const handleGetReviewsByUserId = ({ userId, page, sort }) => {
			return axios.get(
				'https://om.demo.bctc.io/reviews/userId',
				{ params: { userId, page, sort } },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			);
		};

		const fetchReviews = async () => {
			const response = await handleGetReviewsByUserId({
				userId: user._id,
				page: 1,
				sort: false,
			});

			setReviews(response.data.data.result);
		};

		fetchReviews();
	}, [user._id, token]);

	useEffect(() => {
		const handleGetFavoritesByUserId = ({ userId, page }) => {
			return axios.get(
				'https://om.demo.bctc.io/users/favorites/review',
				{ params: { userId, page } },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			);
		};
		const fetchFavorites = async () => {
			const response = await handleGetFavoritesByUserId({
				userId: user._id,
				page: 1,
			});

			setFavorites(response.data.data.result);
		};

		fetchFavorites();
	}, [user._id, token]);

	return (
		<div className='profile-page-container'>
			<div className='user-info-container'>
				<div className='user-info-block'>
					<div className='avatar-block'>
						<img src={user.avatar} alt='avatar' />
					</div>
					<div className='user-block'>
						<div className='user-box'>
							<h1>{user.userName}</h1>
						</div>
						<div className='preview-container'>
							<div className='preview-box'>
								{reviews && <p>{`Reviews:${reviews.length}`}</p>}
								{favorites && <p>{`Favorite:${favorites.length}`}</p>}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='profile-links-container'>
				<div className='order-container'>
					<div className='profile-detail-container'>
						<p>My Order History</p>
						<Link to='/order/history' className='link-container'>
							<p>View All</p>
						</Link>
					</div>
					<div className='order-preview-container'>
						{/* eslint-disable no-mixed-spaces-and-tabs */}
						{orders &&
              orders.map((order, i) => {
              	const INDEX = 3;

              	return (
              		i < INDEX && (
              			<div key={order._id} className='order-preview-block'>
              				<div className='merchant-logo-container'>
              					<img src={order.merchantId.logo} alt='logo' />
              				</div>
              				<p>{`${order.merchantId}@${order.date}`}</p>
              			</div>
              		)
              	);
              })}
					</div>
				</div>
				<div className='profile-detail-container'>
					<p>My Reviews</p>
					<Link to='/review/history' className='link-container'>
						<p>View All</p>
					</Link>
				</div>
				<div className='profile-detail-container'>
					<p>My Favorites</p>
					<Link to='/favorite/restaurants' className='link-container'>
						<p>View All</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
