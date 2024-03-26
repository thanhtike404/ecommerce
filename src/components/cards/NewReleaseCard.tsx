import React from "react";
import Image from "next/image";

const cards = [
	{ backgound: "#F5DD61" },
	{ backgound: "#FF55BB" },
	{ backgound: "#A1EEBD" },
	{ backgound: "#7BD3EA" },
];

export default function NewReleaseCard() {
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
			{cards.map((card, index) => (
				<div
					key={index}
					style={{ backgroundColor: card.backgound }}
					className="relative h-[200px] flex items-end justify-between text-white rounded-xl p-5"
				>
					<div className="shrink-0">
						<h3 className="font-semibold">
							Citrus Mon <br /> 2000 Pul <br />
							Disposable <br />3 Percent
						</h3>
						<p>30000 MMK</p>
					</div>
					<Image
						src="/cardImgs/vape1.png"
						alt="vape"
						width={200}
						height={200}
						className="w-full h-full object-cover"
					/>
				</div>
			))}
		</div>
	);
}
