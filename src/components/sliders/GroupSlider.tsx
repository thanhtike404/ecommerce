"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const cards = [
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Refreshing Mint",
		price: 30000,
		oldPrice: 30000,
		point: 600,
	},
];

export default function GroupSlider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === cards.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="w-full relative">
			<div className="relative w-full h-full overflow-hidden flex items-center gap-2 lg:gap-4">
				<div
					className="flex items-center rounded-xl text-white gap-2"
					style={{
						transform: `translateX(-${currentIndex * 20}%)`,
						transition: "transform 0.5s ease",
					}}
				>
					{cards.map((card, index) => (
						<div
							key={index}
							className="relative flex flex-col items-center"
						>
							<div className="w-[180px] h-[180px] bg-grayColor rounded-xl">
								<Image
									src={card.src}
									alt="vape"
									width={300}
									height={300}
									className="w-full h-full object-cover"
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
			</div>
			{/* Right Arrow */}
			<div
				onClick={nextSlide}
				className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-0 md:right-5 text-2xl rounded-xl px-1.5 lg:px-3 py-8 md:py-10 lg:py-14 bg-black/20 backdrop-blur-md text-white cursor-pointer z-10 border border-gray-400/50"
			>
				<BsChevronCompactRight size={30} />
			</div>
		</div>
	);
}
