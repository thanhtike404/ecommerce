import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
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

export default function Card() {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-2">
			{cards.map((card, index) => (
				<div key={index} className="relative flex flex-col items-center">
					<p className="text-sm bg-red-500 text-white px-6 py-1 absolute">
						{card.discount}% Off
					</p>
					<div className="w-[240px] h-[240px] md:w-[200px] md:h-[200px] bg-grayColor rounded-xl">
						<Image
							src={card.src}
							alt="vape"
							width={300}
							height={300}
							className="w-full h-full object-cover pt-12"
						/>
					</div>
					<h3 className="text-lg mt-2 md:mt-5">{card.title}</h3>
					<p className="font-bold">{card.price}MMK</p>
					<p className="line-through text-sm">{card.oldPrice}MMK</p>
					<p className="flex items-center text-yellow-400 text-sm gap-1">
						<FaStar />
						{card.point} Points
					</p>
				</div>
			))}
		</div>
	);
}
