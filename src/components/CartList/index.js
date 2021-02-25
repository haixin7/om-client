import React from 'react';
import { Button } from 'vant-react';

export default function CartList({
	cartList,
	quantity,
	handleClickAdd,
	handleClickReduce,
	handleClearCart,
}) {

	return (
		<div className='item__container cart'>
			<div className='cart__title'>
				<p>Cart</p>
				<Button text='clear cart' size='small' click={handleClearCart} />
			</div>
			{cartList.map(
				(variant, i) =>
					variant && (
						<div className='item__block' key={`cart-item${i}`}>
							<div className='variant__img'>
								<img src={variant.image} alt='variant-img' />
							</div>
							<div className='variant__info'>
								<h5 className='item__title'>{variant.title}</h5>
								<div className='price__add'>
									<p className='price'>{`$${variant.price}`}</p>
									<div className='stepper'>
										<button
											className='reduce cart__reduce'
											onClick={() =>
												handleClickReduce(
													variant.title,
													variant.image,
													variant.price,
													quantity,
													i,
												)
											}
										>
                      -
										</button>
										<p className='quantity'>{quantity[i]}</p>
										<button
											onClick={() =>
												handleClickAdd(
													variant.title,
													variant.image,
													variant.price,
													quantity,
													i,
												)
											}
										>
                      +
										</button>
									</div>
								</div>
							</div>
						</div>
					),
			)}
		</div>
	);
}
