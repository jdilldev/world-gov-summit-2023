"use client";

import { useState, useEffect } from "react";

export const useDesktop = () => {
	const [isDesktop, setDesktop] = useState(window.innerWidth >= 1243);

	const updateMedia = () => {
		setDesktop(window.innerWidth >= 1243);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return isDesktop;
};

export const useMobile = () => {
	const [isMobile, setMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 749 : false
	);

	const updateMedia = () => {
		setMobile(window.innerWidth < 749);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return isMobile;
};
