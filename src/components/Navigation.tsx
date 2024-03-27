"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { GrClose } from "react-icons/gr";

export default function Navigation() {
	const [navMenuOpen, setNavMenuOpen] = useState(false);
	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolling(true);
			} else {
				setScrolling(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed top-0 w-full flex items-start justify-between px-5 md:px-14 lg:px-36 py-2 md:py-4 z-50 ${
				scrolling ? " bg-black/60 backdrop-blur-md" : ""
			}${navMenuOpen ? " h-screen bg-black/60 backdrop-blur-md" : ""}`}
		>
			<Link
				href={"/"}
				className="font-bold text-white dark:text-bgColor text-xl md:text-2xl"
			>
				PI Vape
			</Link>

			<div className="flex items-center gap-6 text-white pt-2">
				<Link href={"/"} className="text-xl font-bold">
					<IoSearch />
				</Link>
				<Link href={"/"} className="text-xl font-bold">
					<AiOutlineShoppingCart />
				</Link>
				<button
					className=" text-xl text-white cursor-pointer"
					onClick={() => setNavMenuOpen(!navMenuOpen)}
				>
					{navMenuOpen ? <GrClose /> : <IoMdMenu />}
				</button>
				{/* <ul
                    className={`${
                        navMenuOpen
                            ? "flex flex-col gap-6 mt-28 text-white absolute -top-5"
                            : "hidden"
                    }`}
                >
                    <li>
                        <Link href={"/"} className="text-xl font-bold">
                            Navigation 1
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"} className="text-xl font-bold">
                            Navigation 2
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"} className="text-xl font-bold">
                            Navigation 3
                        </Link>
                    </li>
                </ul> */}
			</div>
		</nav>
	);
}
