import React from "react";

export default function viewBtn({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="px-6 py-2 bg-black/20 backdrop-blur-md rounded-full border border-gray-400/50">
			{children}
		</div>
	);
}
