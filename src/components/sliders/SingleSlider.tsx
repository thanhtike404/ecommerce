"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import ViewBtn from "../buttons/ViewBtn";

const cards = [
	{
		src: "/cardImgs/vape1.png",
		title: "Try New Flavor 1",
		description: "Citrus Monster",
	},
	{
		src: "/cardImgs/vape2.png",
		title: "Try New Flavor 2",
		description: "Blueberry Burst",
	},
	{
		src: "/cardImgs/vape3.png",
		title: "Try New Flavor 3",
		description: "Strawberry Splash",
	},
	{
		src: "/cardImgs/vape4.png",
		title: "Try New Flavor 4",
		description: "Orange Blast",
	},
	{
		src: "/cardImgs/vape5.png",
		title: "Try New Flavor 5",
		description: "Pineapple Paradise",
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Try New Flavor 1",
		description: "Citrus Monster",
	},
	{
		src: "/cardImgs/vape2.png",
		title: "Try New Flavor 2",
		description: "Blueberry Burst",
	},
	{
		src: "/cardImgs/vape3.png",
		title: "Try New Flavor 3",
		description: "Strawberry Splash",
	},
	{
		src: "/cardImgs/vape4.png",
		title: "Try New Flavor 4",
		description: "Orange Blast",
	},
	{
		src: "/cardImgs/vape5.png",
		title: "Try New Flavor 5",
		description: "Pineapple Paradise",
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Try New Flavor 1",
		description: "Citrus Monster",
	},
	{
		src: "/cardImgs/vape2.png",
		title: "Try New Flavor 2",
		description: "Blueberry Burst",
	},
	{
		src: "/cardImgs/vape3.png",
		title: "Try New Flavor 3",
		description: "Strawberry Splash",
	},
	{
		src: "/cardImgs/vape4.png",
		title: "Try New Flavor 4",
		description: "Orange Blast",
	},
	{
		src: "/cardImgs/vape5.png",
		title: "Try New Flavor 5",
		description: "Pineapple Paradise",
	},
];

export default function SingleSlider() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === cards.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="w-full relative">
			<div className="relative w-full h-full overflow-hidden flex items-center gap-2 lg:gap-4">
				{cards.map((card, index) => (
					<div
						key={index}
						className="flex items-center rounded-xl"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: "transform 0.5s ease",
						}}
					>
						<div
							className="bg-cover bg-center w-[300px] md:w-[580px] lg:w-[1000px] h-[280px] flex items-center justify-center gap-4 px-10 lg:px-20 rounded-xl overflow-hidden"
							style={{ backgroundImage: `url("/cardBg.jpg")` }}
						>
							<Image
								src={card.src}
								alt="vape"
								width={200}
								height={200}
								className="w-full h-full object-contain"
							/>
							<div className="absolute md:relative text-white shrink-0 flex flex-col items-center gap-2 md:pr-10 ">
								<h3 className="text-2xl md:text-3xl lg:text-5xl font-bold ">
									{card.title}
								</h3>
								<p className="text-lg md:text-xl">{card.description}</p>
								<Link href={"/"}>
									<ViewBtn>View</ViewBtn>
								</Link>
							</div>
						</div>
					</div>
				))}
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
