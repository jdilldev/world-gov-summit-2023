"use client";

import { useState, useEffect } from "react";

export const useDesktop = () => {
	const [isDesktop, setDesktop] = useState(
		typeof window !== "undefined" ? window.innerWidth >= 1487 : false
	);

	const updateMedia = () => {
		setDesktop(window.innerWidth >= 1487);
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
