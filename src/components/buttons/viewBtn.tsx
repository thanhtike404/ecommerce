import React from "react";

export default function ViewBtn({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-24 py-2 grid place-items-center bg-black/20 backdrop-blur-md rounded-full border border-gray-400/50">
			{children}
		</div>
	);
}
