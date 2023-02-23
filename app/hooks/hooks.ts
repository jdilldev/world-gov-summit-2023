"use client";

import { useState, useEffect } from "react";

export const useWindowSize = (): "MOBILE" | "TABLET" | "DESKTOP" => {
	const [windowSize, setWindowSize] = useState(0);

	useEffect(() => {
		const updateWindowSize = () => {
			setWindowSize(window.innerWidth);
		};

		updateWindowSize();
		window.addEventListener("resize", updateWindowSize);
		return () => window.removeEventListener("resize", updateWindowSize);
	}, []);

	return windowSize < 825 ? "MOBILE" : windowSize > 825 ? "DESKTOP" : "TABLET";
};

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
