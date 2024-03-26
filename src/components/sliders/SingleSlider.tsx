"use client";
import React, { useState } from "react";

const cards = [
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		discount: 25,
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
];
export default function SingleSlider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevCard = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? cards.length - 1 : prevIndex - 1
		);
	};

	const nextCard = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === cards.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="relative w-full overflow-hidden">
			<div className="flex">
				<button
					onClick={prevCard}
					className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-4 py-2 rounded-lg"
				>
					Prev
				</button>
				<button
					onClick={nextCard}
					className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-4 py-2 rounded-lg"
				>
					Next
				</button>
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
				>
					{cards.map((card, index) => (
						<div key={index} className="w-full">
							{/* Render your card component here using the data from 'cards' */}
							<div className="bg-white p-4 rounded-lg shadow-md">
								<img
									src={card.src}
									alt={card.title}
									className="w-full h-auto mb-4"
								/>
								<h3 className="text-xl font-bold">{card.title}</h3>
								<p className="text-gray-600">Price: ${card.price}</p>
								<p className="text-gray-600">
									Old Price: ${card.oldPrice}
								</p>
								<p className="text-gray-600">
									Discount: {card.discount}%
								</p>
								<p className="text-gray-600">Points: {card.point}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
