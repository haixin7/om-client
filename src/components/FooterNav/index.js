import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { Icon } from 'vant-react';

export default function FooterNav({ history }) {
	const merchantId = history.match.params.name;
	const currentPath = history.match.path;
	const homePattern = document.getElementsByClassName('homePattern');
	const profilePattern = document.getElementsByClassName('profilePattern');
	const menuPattern = document.getElementsByClassName('menuPattern');
	const FIRST_INDEX = 0;

	useEffect(() => {
		if (currentPath === '/') {
			homePattern[FIRST_INDEX].style.color = '#f34647';
		}
		if (currentPath === '/profile') {
			profilePattern[FIRST_INDEX].style.color = '#f34647';
		} else {
			menuPattern[FIRST_INDEX].style.color = '#f34647';
		}
	}, [currentPath, homePattern, profilePattern, menuPattern]);

	return (
		<footer className='footer__nav'>
			<Link to='/' className='homePattern'>
				<Icon name='wap-home-o' />
				<p>Home</p>
			</Link>
			<Link to={`/merchant/${merchantId}/menu`} className='menuPattern'>
				<Icon name='orders-o' />
				<p>Menu</p>
			</Link>
			<Link to='/profile' className='profilePattern'>
				<Icon name='contact' />
				<p>Profile</p>
			</Link>
		</footer>
	);
}
