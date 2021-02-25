import React from 'react';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';
import classnames from 'classnames';

import { Icon, Button } from 'vant-react';

import './index.scss';

const CHANGE_AMOUNT = 1;
const DEFAULT_VAULE = 0;

export default function ShoppingCart({ history }) {
	const cartReducer = (state, action) => {
		switch (action.type) {
			case 'INC': {
				const nextState = { ...state, quantity: [...state.quantity] };

				nextState.quantity[action.number] += CHANGE_AMOUNT;
				return nextState;
			}
			case 'DEC': {
				const nextState = { ...state, quantity: [...state.quantity] };
				const nextcartList = [...state.cartList];

				nextState.quantity[action.number] -= CHANGE_AMOUNT;
				if (nextState.quantity[action.number] === DEFAULT_VAULE) {
					nextcartList[action.number] = null;
					nextState.cartList = nextcartList;
				}
				return nextState;
			}
			default:
				return state;
		}
	};
	const initialState = history.location.state;
	const merchantId = history.match.params.name;
	const [state, dispatch] = useReducer(cartReducer, { ...initialState });

	const handleProcess = () =>{
		history.history.push('/order/confirmation', state);
	};

	return (
		<div className='shopping_cart_wrapper'>
			<div className='shopping_cart_header'>
				<div className='shopping_cart_title'>
					<Link to={{ pathname: `/merchant/${merchantId}/menu`, state }}>
						<Icon name='arrow-left' />
					</Link>
					<p>Shopping Cart</p>
				</div>
			</div>
			{state.cartList &&
							state.cartList.map(
								(variant, index) =>
									variant && (
										<div className='item_block' key={`cart_item${index}`}>
											{variant.image && (
												<div className='variant_img'>
													<img
														src={variant.image}
														className='variant_img'
														alt={variant.description}
													/>
												</div>
											)}
											<div className='variant_info'>
												<div className={classnames('variant-title', {displayImageInfo: variant.image})}
												>
													<p className='item_title'>{variant.title}</p>
													<p className='price'>{`$${variant.price}`}</p>
												</div>
												<div className='price_add'>
													<div className={classnames('stepper', {nonDisplayImageStepper: !variant.image})}
													>
														<button
															className='reduce cart_reduce'
															onClick={() => {
																dispatch({ type: 'DEC', number: index });
															}}
														>
														-
														</button>
														<p className='quantity'>{state.quantity[index]}</p>
														<button
															onClick={() => {
																dispatch({ type: 'INC', number: index });
															}}
														>
														+
														</button>
													</div>
												</div>
											</div>
										</div>
									),
							)}
			<Button
				type='danger'
				text='Proceed to Checkout'
				className='button_icon'
				click={handleProcess}
			>
			</Button>
		</div>
	);
}
