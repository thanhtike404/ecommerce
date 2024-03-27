import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import ViewMoreBtn from "@/components/buttons/ViewMoreBtn";
import ViewBtn from "@/components/buttons/ViewBtn";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import NewReleaseCard from "@/components/cards/NewReleaseCard";
import Link from "next/link";
import SingleSlider from "@/components/sliders/SingleSlider";
import GroupSlider from "@/components/sliders/GroupSlider";
import ComponentSlide from "@/components/sliders/ComponentSlide";
export default function Home() {
	return (
		<div className="w-full flex flex-col items-center">
			{/* ========== Hero Section ========== */}
			<Carousel />

			{/* =========== First Component ========== */}
			<section className="w-full container flex flex-col items-center mt-8">
				<h1 className="text-4xl md:text-5xl font-bold">Best Deals</h1>
				<p className="text-xl md:text-2xl mt-2">Just For You</p>
				{/* ------ Cards ------- */}
				<div className="mt-10 flex flex-col items-center gap-6">
					<Card />
					<Link href={"/"}>
						<ViewMoreBtn>
							View More <IoIosArrowForward />
						</ViewMoreBtn>
					</Link>
				</div>
			</section>
			{/* =========== Second Component ========== */}
			<section className="container flex flex-col lg:flex-row gap-2 text-white">
				<div className="w-full h-[400px] lg:w-7/12 bg-gray-800 rounded-xl p-8 md:p-10 flex flex-col justify-end gap-2">
					<h3 className="text-4xl md:text-5xl font-bold">
						Membership Program
					</h3>
					<p className="text-lg md:text-xl">
						Be a Vape PI member and get our{" "}
						<br className="hidden md:block" />
						special exclusive offers
					</p>
					<Link href={"/"} className="w-20">
						<ViewBtn>View</ViewBtn>
					</Link>
				</div>
				<div className="w-full h-[400px] lg:w-5/12 grid grid-cols-12 gap-2">
					<div className="w-full h-auto bg-gray-800 col-span-6 row-span-2 rounded-xl flex flex-col justify-end overflow-hidden">
						<Image
							src="/cardImgs/vape1.png"
							alt="vape"
							width={200}
							height={200}
							className="w-full h-full object-cover object-top"
						/>
						<Link
							href={"/"}
							className="bg-transparent hover:bg-black/20 hover:backdrop-blur-md p-3 md:p-5"
						>
							<div className="flex items-center justify-between">
								<h3 className="text-xl md:text-2xl font-bold">
									Devices
								</h3>
								<IoIosArrowForward />
							</div>
							<p className="text-sm md:text-base">
								Find the best for <br className="hidden md:block" /> you
								here!
							</p>
						</Link>
					</div>
					<div className="relative w-full bg-gray-800 col-span-6 row-span-1 rounded-xl overflow-hidden">
						<Image
							src="/cardImgs/vape1.png"
							alt="vape"
							width={200}
							height={200}
							className="w-full h-full object-cover object-top"
						/>
						<Link
							href={"/"}
							className="absolute bottom-0 w-full bg-transparent hover:bg-black/20 hover:backdrop-blur-md p-3 md:p-5"
						>
							<div className="flex items-center justify-between">
								<h3 className="text-xl md:text-2xl font-bold">Pods</h3>
								<IoIosArrowForward />
							</div>
							<p className="text-sm md:text-base">
								Variety of choices <br className="hidden md:block" />
								avaliable
							</p>
						</Link>
					</div>
					<div className="relative w-full bg-gray-800 col-span-6 row-span-1 rounded-xl overflow-hidden">
						<Image
							src="/cardImgs/vape1.png"
							alt="vape"
							width={200}
							height={200}
							className="w-full h-full object-cover object-t"
						/>
						<Link
							href={"/"}
							className="absolute bottom-0 w-full bg-transparent hover:bg-black/20 hover:backdrop-blur-md p-3 md:p-5"
						>
							<div className="flex items-center justify-between">
								<h3 className="text-xl md:text-2xl font-bold">
									Disposable
								</h3>
								<IoIosArrowForward />
							</div>
							<p className="text-sm md:text-base">
								Easy, clean & <br className="hidden md:block" />
								superb flavor
							</p>
						</Link>
					</div>
				</div>
			</section>
			{/* =========== Third Component ========== */}
			<section className="container flex flex-col items-center gap-8">
				<div className="space-y-2">
					<h1 className="text-5xl font-bold">
						<span className="text-red-500">New</span> Released
					</h1>
					<p className="text-xl text-center">
						Try Our Latest Flavours Here
					</p>
				</div>

				<NewReleaseCard />

				<Link href={"/"}>
					<ViewMoreBtn>
						View More <IoIosArrowForward />
					</ViewMoreBtn>
				</Link>
			</section>

			{/* =========== Fourth Component ========== */}
			<section className="container">
				<SingleSlider />
			</section>

			{/* =========== Fifth Component ========== */}
			<section className="container">
				<ComponentSlide />
			</section>
		</div>
	);
}
