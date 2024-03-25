import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { IoIosArrowForward } from "react-icons/io";
export default function Home() {
	return (
		<div>
			{/* ========== Hero Section ========== */}
			<Carousel />

			{/* =========== First Component ========== */}
			<div className="container flex flex-col items-center">
				<h1 className="text-5xl font-bold">Best Deals</h1>
				<p className="text-2xl mt-2">Just For You</p>
				{/* ------ Cards ------- */}
				<div className="mt-10 flex flex-col items-center gap-6">
					<Card />
					<button className="bg-grayColor px-24 py-2 flex items-center gap-1 rounded-full">
						View More <IoIosArrowForward />
					</button>
				</div>
			</div>
		</div>
	);
}
