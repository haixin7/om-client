import React, { useState, useEffect } from 'react';
import './index.scss';
import { Rate, Button, Icon, Field } from 'vant-react';
import MenuServices from '../../../service/menu';
import MenuList from '../../../components/MenuList';
import FooterNav from '../../../components/FooterNav';
// eslint-disable-next-line max-statements
export default function MenuPage({ history }) {
	const [merchant, setMerchant] = useState({});
	const [categories, setCategories] = useState([]);
	const [variants, setVariants] = useState([]);
	const [popupOpen, setPopupOpen] = useState(false);
	const [cartList, setCartList] = useState([]);
	const [quantity, setQuantity] = useState([]);
	const [item, setItem] = useState({});
	const [badge, setBadge] = useState('0');
	const merchantId = history.match.params.name;
	const initialState = history.location.state;
	const CHANGE_AMOUNT = 1;
	const DEFAULT_VALUE = 0;
	const FIRST_INDEX = 0;

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await MenuServices.handleGetCategoryByMerchantId(
					merchantId,
				);

				setMerchant(response.data.data.result[FIRST_INDEX]);
				setCategories(response.data.data.result);
			} catch (e) {
				alert(e);
			}
		};

		fetchCategory();
	}, [merchantId]);
	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await MenuServices.handleGetVariantsByMerchantId(
					merchantId,
				);

				setVariants(response.data.data.result);
				if (initialState) {
					if (initialState.quantity) {
						setQuantity([...initialState.quantity]);
					}
					if (initialState.cartList) {
						setCartList([...initialState.cartList]);
					}
				} else {
					for (let i = FIRST_INDEX; i < response.data.data.total; i++) {
						quantity.push(DEFAULT_VALUE);
						cartList.push(null);
					}
					setQuantity([...quantity]);
					setCartList([...cartList]);
				}
			} catch (e) {
				alert(e);
			}
		};

		fetchMenu();
		/* eslint-disable-next-line*/
  }, [merchantId]);

	const menu = document.getElementsByClassName('menu__container');
	const cateBlock = document.getElementsByClassName('categories__block');
	const cateTitle = document.getElementsByClassName('category__title');

	useEffect(() => {
		menu[FIRST_INDEX].addEventListener('scroll', () => {
			for (let i = 0; i < cateBlock.length; i++) {
				const adjustY = cateBlock[FIRST_INDEX].offsetTop;

				if (
					menu[FIRST_INDEX].scrollTop >= cateBlock[i].offsetTop - adjustY &&
          menu[FIRST_INDEX].scrollTop <
            cateBlock[i].offsetTop - adjustY + cateBlock[i].offsetHeight
				) {
					cateTitle[i].style.borderBottom = '2px solid #f34647';
				} else {
					cateTitle[i].style.borderBottom = '2px solid transparent';
				}
			}
		});
	}, [menu, cateBlock, cateTitle]);

	const list = document.getElementsByClassName('item__title');
	const itemList = document.getElementsByClassName('item__block');

	const handleInputChange = (e) => {
		const { value } = e.target;

		for (let i = FIRST_INDEX; i < list.length; i++) {
			if (list[i].innerHTML.indexOf(value) >= FIRST_INDEX) {
				itemList[i].style.display = 'flex';
			} else {
				itemList[i].style.display = 'none';
			}
		}
	};
	const handlePopupOpen = () => {
		setPopupOpen(!popupOpen);
	};

	const handleStepperChange = (title, image, price, value, i) => {
		quantity[i] = value;
		setQuantity([...quantity]);
		const itemQuantity = quantity[i];

		setItem({ ...item, title, image, price, itemQuantity, i });
	};

	useEffect(() => {
		if (item.itemQuantity > DEFAULT_VALUE) {
			cartList[item.i] = item;
		} else {
			cartList[item.i] = null;
		}
		setCartList([...cartList]);
		/* eslint-disable-next-line*/
  }, [item]);
	useEffect(() => {
		let total = DEFAULT_VALUE;

		cartList.map((item) => {
			if (item) {
				total = total + CHANGE_AMOUNT;
			}
			return total;
		});
		setBadge(total.toString());
	}, [cartList]);

	const handleNextPage = () => {
		history.history.push(`/merchant/${merchantId}/shoppingcart`, {
			cartList,
			quantity,
			merchant,
		});
	};

	return (
		<div className='menu__page'>
			<div className='logo'>
				<img src={merchant.logo} alt='merchant logo' />
			</div>
			<div className='merchant__container'>
				<div className='merchant__layout'>
					<div className='merchant__info'>
						<h2>{merchant.name}</h2>
						<p>{merchant.description}</p>
						<div className='review__block'>
							<Rate currentRate={3} readonly size='12px' gutter='0px' />
							<p>{`Recommended ${merchant.likesCount} times`}</p>
						</div>
					</div>
					<div className='table'>
						<h3>A7</h3>
					</div>
				</div>
			</div>
			<div className='search'>
				<Field
					type='text'
					leftIcon='search'
					placeholder='Search'
					input={handleInputChange}
				/>
			</div>
			<div className='category__container'>
				<div className='category__list'>
					{categories.map((category, i) => (
						<div className='category__title' key={`category${i}`}>
							<a href={`#${category.categoryInfo.title}`}>
								{category.categoryInfo.title}
							</a>
						</div>
					))}
				</div>
			</div>
			<div className='menu__container'>
				<MenuList
					variants={variants}
					quantity={quantity}
					categories={categories}
					handleStepperChange={handleStepperChange}
				/>
			</div>
			<div className='footer__button__field'>
				<Button round type='danger' size='big' click={handleNextPage}>
					<Icon
						name='shopping-cart-o'
						color='#f34647'
						click={handlePopupOpen}
					/>
					<p>Shopping Cart</p>
					<div className='badge'>
						<span>{badge}</span>
					</div>
				</Button>
			</div>
			<FooterNav history={history} />
		</div>
	);
}
