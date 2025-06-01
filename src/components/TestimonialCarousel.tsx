
"use client";

import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, PanInfo} from "framer-motion";
import {Quote, X} from "lucide-react";
import {cn} from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
	name: string;
	designation: string;
	description: string;
	profileImage: string;
}

interface iCarouselProps {
	items: React.ReactElement<{
		testimonial: iTestimonial;
		index: number;
		layout?: boolean;
		onCardClose: () => void;
	}>[];
	initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement | null>,
	onOutsideClick: () => void,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			onOutsideClick();
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({items, initialScroll = 0}: iCarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const cardWidth = 400; // Width of each card plus gap
	const totalCards = items.length;

	const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		setIsDragging(false);
		const threshold = 50; // Minimum drag distance to trigger navigation
		
		if (Math.abs(info.offset.x) > threshold) {
			if (info.offset.x > 0 && currentIndex > 0) {
				// Dragged right, go to previous
				setCurrentIndex(currentIndex - 1);
			} else if (info.offset.x < 0 && currentIndex < totalCards - 1) {
				// Dragged left, go to next
				setCurrentIndex(currentIndex + 1);
			}
		}
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	useEffect(() => {
		if (carouselRef.current) {
			const scrollPosition = currentIndex * cardWidth;
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		}
	}, [currentIndex, cardWidth]);

	return (
		<div className="relative w-full mt-10">
			<div className="overflow-hidden">
				<motion.div
					ref={carouselRef}
					className="flex gap-6 px-4"
					drag="x"
					dragConstraints={{
						left: -(totalCards - 1) * cardWidth,
						right: 0,
					}}
					onDragStart={() => setIsDragging(true)}
					onDragEnd={handleDragEnd}
					animate={{
						x: -currentIndex * cardWidth,
					}}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
					}}
					style={{
						cursor: isDragging ? "grabbing" : "grab",
					}}
				>
					{items.map((item, index) => (
						<motion.div
							key={`card-${index}`}
							className="flex-shrink-0"
							initial={{opacity: 0, y: 20}}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.5,
									delay: 0.1 * index,
									ease: "easeOut",
								},
							}}
						>
							{React.cloneElement(item, {
								onCardClose: () => {},
							})}
						</motion.div>
					))}
				</motion.div>
			</div>
			
			{/* Position Indicators */}
			<div className="flex justify-center gap-2 mt-6">
				{items.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={cn(
							"w-3 h-3 rounded-full transition-all duration-300",
							currentIndex === index
								? "bg-[#4b3f33] scale-110"
								: "bg-[#4b3f33]/30 hover:bg-[#4b3f33]/50"
						)}
					/>
				))}
			</div>
		</div>
	);
};

const TestimonialCard = ({
	testimonial,
	index,
	layout = false,
	onCardClose = () => {},
	backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: {
	testimonial: iTestimonial;
	index: number;
	layout?: boolean;
	onCardClose?: () => void;
	backgroundImage?: string;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleExpand = () => {
		setIsExpanded(true);
	};
	
	const handleCollapse = () => {
		setIsExpanded(false);
		onCardClose();
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCollapse();
			}
		};

		if (isExpanded) {
			const scrollY = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
			document.body.style.overflow = "hidden";
			document.body.dataset.scrollY = scrollY.toString();
		} else {
			const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			window.scrollTo({top: scrollY, behavior: "instant"});
		}

		window.addEventListener("keydown", handleEscapeKey);
		return () => {
			window.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isExpanded]);

	useOutsideClick(containerRef, handleCollapse);

	return (
		<>
			<AnimatePresence>
				{isExpanded && (
					<div className="fixed inset-0 h-screen overflow-hidden z-50">
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							className="bg-black/50 backdrop-blur-lg h-full w-full fixed inset-0"
						/>
						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0.9}}
							ref={containerRef}
							layoutId={layout ? `card-${testimonial.name}` : undefined}
							className="max-w-4xl mx-auto bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-full z-[60] p-6 md:p-10 rounded-3xl relative md:mt-10"
							transition={{type: "spring", duration: 0.5}}
						>
							<button
								className="sticky top-4 h-10 w-10 right-0 ml-auto rounded-full flex items-center justify-center bg-[#4b3f33] hover:bg-[#4b3f33]/80 transition-colors"
								onClick={handleCollapse}
							>
								<X className="h-6 w-6 text-white" />
							</button>
							<motion.p
								layoutId={layout ? `category-${testimonial.name}` : undefined}
								className="px-0 md:px-20 text-[rgba(31, 27, 29, 0.7)] text-lg font-medium"
							>
								{testimonial.designation}
							</motion.p>
							<motion.p
								layoutId={layout ? `title-${testimonial.name}` : undefined}
								className="px-0 md:px-20 text-3xl md:text-5xl font-bold text-[rgba(31, 27, 29, 0.7)] mt-4"
							>
								{testimonial.name}
							</motion.p>
							<div className="py-8 text-[rgba(31, 27, 29, 0.7)] px-0 md:px-20 text-xl md:text-2xl leading-relaxed">
								<Quote className="h-8 w-8 text-[rgba(31, 27, 29, 0.7)] mb-4" />
								{testimonial.description}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.button
				layoutId={layout ? `card-${testimonial.name}` : undefined}
				onClick={handleExpand}
				className="select-none"
				whileHover={{
					scale: 1.02,
					rotateY: 2,
					transition: {duration: 0.3, ease: "easeOut"},
				}}
				whileTap={{scale: 0.98}}
			>
				<div className="rounded-3xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-[400px] md:h-[500px] w-[320px] md:w-[380px] overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-xl">
					<div className="absolute opacity-20 inset-0">
						<img
							className="w-full h-full object-cover"
							src={backgroundImage}
							alt="Background"
						/>
					</div>
					
					<ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
					
					<motion.p
						layoutId={layout ? `title-${testimonial.name}` : undefined}
						className="text-[rgba(31, 27, 29, 0.7)] text-lg md:text-xl font-medium text-center px-6 mt-6 leading-relaxed"
					>
						{testimonial.description.length > 120
							? `"${testimonial.description.slice(0, 120)}..."`
							: `"${testimonial.description}"`}
					</motion.p>
					
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-[rgba(31, 27, 29, 0.7)] text-xl md:text-2xl font-bold text-center mt-6"
					>
						{testimonial.name}
					</motion.p>
					
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-[rgba(31, 27, 29, 0.7)] text-sm md:text-base font-medium text-center mt-2 opacity-70"
					>
						{testimonial.designation}
					</motion.p>
				</div>
			</motion.button>
		</>
	);
};

const ProfileImage = ({src, alt, ...rest}: {src: string; alt: string}) => {
	const [isLoading, setLoading] = useState(true);

	return (
		<div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full border-4 border-[rgba(59,59,59,0.3)] relative">
			<img
				className={cn(
					"transition duration-300 w-full h-full object-cover",
					isLoading ? "blur-sm" : "blur-0",
				)}
				onLoad={() => setLoading(false)}
				src={src}
				loading="lazy"
				alt={alt || "Profile image"}
				{...rest}
			/>
		</div>
	);
};

// Export the components
export {Carousel, TestimonialCard, ProfileImage};
