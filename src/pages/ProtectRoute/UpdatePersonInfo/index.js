import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Field, Button } from 'vant-react';
import './index.scss';

export default function UpdatePersonInformationPage() {
	const token = window.localStorage.getItem('token');
	const ZERO = 0;

	const [user, setUser] = useState({});
	const [values, setValues] = useState({});
	const [previewLink, setPreviewLink] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(
				'https://om.demo.bctc.io/users/current',
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			);

			setUser({ ...response.data.data });
		};

		if (token) {
			fetchUser();
		}
	}, [token]);

	const formInputs = [
		{ key: 'email', type: 'text' },
		{ key: 'phone', type: 'text' },
		{ key: 'userName', type: 'text,' },
		{ key: 'phone', type: 'text' },
		{ key: 'street', type: 'text' },
		{ key: 'city', type: 'text' },
		{ key: 'state', type: 'text' },
		{ key: 'zipCode', type: 'text' },
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({ ...values, [name]: value });
	};

	const handleUploadAvatar = (avatar) => {
		return axios.post('https://om.demo.bctc.io/files/user/avatar', avatar);
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[ZERO];
		const link = URL.createObjectURL(file);

		setPreviewLink(link);
		const formData = new FormData();

		formData.append('avatar', file);
		const uploadResult = await handleUploadAvatar(formData);

		setValues({ ...values, avatar: uploadResult.data.data });
	};

	const handleProfileChange = ({ userId, field, value }) => {
		return axios.put(
			'https://om.demo.bctc.io/users',
			{ userId, field, value },
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
		);
	};

	const handleSubmit = async () => {
		try {
			const userId = user._id;
			const field = Object.keys(values)[ZERO];
			const value = Object.values(values)[ZERO];
			const updateResult = await handleProfileChange({ userId, field, value });

			if (updateResult.data.success === true) {
				window.location.reload();
				setValues({});
			} else {
				alert('Something went wrong!');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div>
			<h2>Profile Setting</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				{/* eslint-disable no-mixed-spaces-and-tabs */}
				{formInputs &&
          formInputs.map((value) => {
          	const { key, type } = value;

          	return (
          		<div className='form-container' key={key}>
          			<div className='input-container'>
          				<Field
          					label={key}
          					type={type}
          					placeholder={user[key]}
          					input={handleInputChange}
          					name={key}
          				/>
          			</div>
          			<div className='button-container'>
          				<Button type='primary' click={handleSubmit}>
                    Update
          				</Button>
          			</div>
          		</div>
          	);
          })}
				<div className='avatar-upload-container'>
					{previewLink ? (
						<img src={previewLink} alt='preview' className='avatar' />
					) : (
						<img src={user.avatar} alt='avatar' className='avatar' />
					)}
					<input
						type='file'
						placeholder={'avatar'}
						onChange={handleFileUpload}
					/>
					<div className='button-container'>
						<Button type='primary' click={handleSubmit}>
              Update
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
