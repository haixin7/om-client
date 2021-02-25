import React, { useEffect } from 'react';
import { Stepper } from 'vant-react';

export default function MenuList({
	variants,
	handleStepperChange,
	quantity,
	categories,
}) {
	const FIRST_INDEX = 0;
	const DEFAULT_VALUE = 0;

	const quantityValue = document.getElementsByClassName('quantity');
	const reduceButton = document.getElementsByClassName('reduce');

	useEffect(() => {
		for (let i = FIRST_INDEX; i < quantityValue.length; i++) {
			if (+quantityValue[i].innerHTML > DEFAULT_VALUE) {
				reduceButton[i].style.display = 'block';
			} else {
				reduceButton[i].style.display = 'none';
			}
		}
		return;
	}, [quantity, reduceButton, quantityValue]);

	return (
		<div className='item__container'>
			{categories.map((categories, j) => (
				<div
					className='categories__block'
					id={categories.categoryInfo.title}
					key={`category${j}`}
				>
					{variants.map(
						(variant, i) =>
							categories.categoryInfo.title === variant.categoryInfo.title && (
								<div
									className='item__block'
									key={`item${i}`}
									style={{
										backgroundImage: `url(${variant.itemInfo.image})`,
									}}
								>
									<div
										className={`item__block__layout ${
											variant.itemInfo.image
												? 'item__block__filter'
												: 'item__block__backdrop'
										}`}
									>
										<div className='variant__layout'>
											<div
												className={`variant__info ${
													variant.itemInfo.image ? '' : 'variant__info__red'
												}`}
											>
												{variant.title === 'small' ? (
													<h5 className='item__title'>{`${variant.itemInfo.title}(小)`}</h5>
												) : (
													<h5 className='item__title'>
														{variant.itemInfo.title}
													</h5>
												)}
												<p className='item__price'>{`$${variant.price.$numberDecimal}`}</p>
											</div>

											<Stepper
												theme
												onChange={(value) => {
													handleStepperChange(
														variant.itemInfo.title,
														variant.itemInfo.image,
														variant.price.$numberDecimal,
														value,
														i,
													);
												}}
											/>
										</div>
									</div>
								</div>
							),
					)}
				</div>
			))}
		</div>
	);
}
