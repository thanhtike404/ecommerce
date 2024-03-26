import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import ViewMoreBtn from "@/components/buttons/viewMoreBtn";
import { IoIosArrowForward } from "react-icons/io";
export default function Home() {
	return (
		<div className="w-full flex flex-col items-center">
			{/* ========== Hero Section ========== */}
			<Carousel />

			{/* =========== First Component ========== */}
			<section className="w-full container flex flex-col items-center">
				<h1 className="text-4xl md:text-5xl font-bold">Best Deals</h1>
				<p className="text-xl md:text-2xl mt-2">Just For You</p>
				{/* ------ Cards ------- */}
				<div className="mt-10 flex flex-col items-center gap-6">
					<Card />
					<ViewMoreBtn>
						View More <IoIosArrowForward />
					</ViewMoreBtn>
				</div>
			</section>
			{/* =========== First Component ========== */}
			<section className="container grid grid-cols-12 gap-2 mx-auto w-">
				<div className="w-full h-auto bg-black col-span-12 md:col-span-8 row-span-2"></div>
				<div className="w-full h-auto bg-black col-span-12 md:col-span-2 row-span-2"></div>
				<div className="w-full h-40 bg-black col-span-6 md:col-span-2 row-span-1"></div>
				<div className="w-full h-40 bg-black col-span-6 md:col-span-2 row-span-1"></div>
			</section>
		</div>
	);
}
