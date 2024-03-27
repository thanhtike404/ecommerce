import React from "react";
import Image from "next/image";
import GroupSlider from "./GroupSlider";
const components = [
	{
		src: "/cardImgs/vape1.png",
		title: "Devices",
		description: "Find the best for you here",
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Pods",
		description: "Variety of choices available",
	},
	{
		src: "/cardImgs/vape1.png",
		title: "Disposable",
		description: "Easy, clean & superb flavor",
	},
];
export default function ComponentSlide() {
	return (
		<div className="w-full space-y-10 ">
			{components.map((component, index) => (
				<div
					key={index}
					className="w-full bg-gray-800 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6 p-4 md:p-6 lg:px-0 lg:py-6"
				>
					<div className="relative flex items-center w-full lg:w-4/12">
						<div className="flex-1 h-[200px] lg:h-[300px]">
							<Image
								src={component.src}
								alt="vape"
								width={200}
								height={300}
								className="w-full h-full object-contain"
							/>
						</div>
						<div className="text-white flex-1 shrink-0 space-y-2">
							<h3 className="text-xl md:text-3xl font-bold ">
								{component.title}
							</h3>
							<p className="text-base md:text-xl w-full md:w-7/12 lg:w-full">
								{component.description}
							</p>
						</div>
					</div>
					<div className="w-full lg:w-8/12">
						<GroupSlider />
					</div>
				</div>
			))}
		</div>
	);
}
