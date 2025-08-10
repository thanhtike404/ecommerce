import React from "react";

export default function ViewMoreBtn({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 flex items-center gap-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
			{children}
		</button>
	);
}
