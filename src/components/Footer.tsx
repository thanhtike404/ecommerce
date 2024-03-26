import Image from "next/image";
import React from "react";

const socialImages = [
	{ src: "/social/facebook.png", alt: "facebook" },
	{ src: "/social/instagram.jpeg", alt: "instagram" },
	{ src: "/social/viber.png", alt: "viber" },
	{ src: "/social/telegram.png", alt: "telegram" },
	{ src: "/social/twitter.png", alt: "twitter" },
];

export default function Footer() {
	return (
		<footer className="w-full mx-auto container space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start ">
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold">Customer Service</h3>
					<p>Terms&Privacy Policy</p>
					<p>Return Policy</p>
				</div>
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold">Language</h3>
					<p>Myanmar (Unicode )</p>
					<p>Myanmar (Zawgyi)</p>
					<p>English</p>
				</div>
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold">Contact us</h3>
					<p>
						Lay Daunt Kan Main Road, Cashmere Stop, Near Zawanna,
						Thingangyun Township, Yangon.
					</p>
					<p>09458489548</p>
				</div>
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold ">Download Our App</h3>
					<Image src={"/qr.png"} alt="QR code" width={150} height={150} />
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-start gap-10 md:gap-24 ">
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold ">Payment</h3>
					<div className="flex gap-4">
						<Image
							src={"/social/kpay.jpeg"}
							alt="kpay"
							width={50}
							height={50}
						/>
						<Image
							src={"/social/wavepay.jpeg"}
							alt="kpay"
							width={50}
							height={50}
							className="rounded-md"
						/>
					</div>
				</div>
				<div className="space-y-4">
					<h3 className="text-2xl font-semibold ">Follow Us On</h3>
					<div className="flex items-center gap-2">
						{socialImages.map((img, index) => (
							<div key={index}>
								<Image
									src={img.src}
									alt={img.alt}
									width={50}
									height={50}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<p className="text-sm text-center text-gray-400 pt-10">
				Copyright 2023 by AA Co.,Ltd. All rights reserved.
			</p>
		</footer>
	);
}
