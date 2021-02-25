import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Button } from 'vant-react';
import './index.scss';
import shortid from 'shortid';
export default function SplitPayment({ history }) {
	const [users, setUsers] = useState([]);
	const url = 'https://om.demo.bctc.io';

	const socket = io(url);

	const room = window.location.href;
	const [admin, setAdmin] = useState('');
	const merchant = history.match.params.name;
	const table = history.match.params.table;
	const total = history.match.params.total;
	const [split, setSplit] = useState([]);
	const [isPay, setPay] = useState(false);
	const INDEX = 0;

	useEffect(() => {
		if (history.location.state) {
			const temp = history.location.state;

			const username = temp[INDEX];

			setAdmin(username);
			socket.emit('joinRoom', { username, room });
			socket.on('roomUsers', ({ users }) => {
				setUsers(users);
			});
		} else {
			const username = window.prompt();

			socket.emit('joinRoom', { username, room });
			socket.on('roomUsers', ({ users }) => {
				setUsers(users);
				for (let i = 0; i < users.length; i++) {
					if (users[i].username === username) {
						window.localStorage.setItem(i, username);
					}
				}
			});
		}
		socket.on('payment', (msg) => {
			console.log(msg);
			const arr = msg.temp;

			setSplit(arr);
		});
	}, [history, socket, room]);

	useEffect(() => {
		const temp = [];

		console.log(users);
		for (let i = 0; i < users.length; i++) {
			temp.push(total / users.length);
		}
		setSplit(temp);
	}, [users, total]);

	console.log(users);

	const handleChangeValue = (e, i) => {
		console.log(e.target.value);

		const temp = [...split];

		temp[i] = e.target.value;

		// setSplit(temp);
		socket.emit('chatMessage', { temp });
	};

	useEffect(() => {
		if (split[INDEX]) {
			console.log(split);

			const sum = (arr) => {
				return arr.reduce((prev, curr) => {
					return prev + curr;
				});
			};
			const result = sum(split);

			if (result === total) {
				setPay(false);
			} else {
				setPay(true);
			}
		}
	}, [split, total]);
	const handleSubmit = () => {
		console.log('pay');
	};

	return (
		<div>
			<h2>split payment </h2>

			<div>
				<h2>Merchant: {merchant}</h2>
				<h3>Table: {table}</h3>
				<h2>Total: ${total}</h2>
			</div>
			<div>
				{admin
					? users &&
								users.map((v, i) => (
									<div key={shortid.generate()}>
										<img
											src='https://res.cloudinary.com/dlapk94rx/image/upload/v1597441299/Image_Type_xuqzp6.png'
											alt=''
										/>
										<h2>Name: {v.username}</h2>
										<input
											type='text'
											value={split[i] || ''}
											onChange={(e) => handleChangeValue(e, i)}
										/>
									</div>
								))
					: users &&
					users.map((v, i) => (
						<div className='guest' key={shortid.generate()}>
							<img
								src='https://res.cloudinary.com/dlapk94rx/image/upload/v1597441299/Image_Type_xuqzp6.png'
								alt=''
							/>
							<h2>Name: {v.username}</h2>
							<input
								className='guest-input'
								type='text'
								value={split[i] || ''}
								readOnly
								disabled
							/>
						</div>
					))}
			</div>
			<div>
				<Button click={handleSubmit} type='primary' disabled={isPay}>
          Pay
				</Button>
			</div>
		</div>
	);
}
