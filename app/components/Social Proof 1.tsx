"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity as useFramerVelocity,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
export interface ClientLogo {
  logoImage: string;
  alt: string;
  text?: string;
}

export interface HeadingProps {
  text?: string;
  className?: string;
}

export interface LogoCloudProps {
  className?: string;
  heading?: HeadingProps;
  clientLogos?: ClientLogo[];
  velocitySpeed?: number;
  grayscale?: boolean;
  animate?: boolean;
}

// --- Defaults ---
const DEFAULT_HEADING: Required<HeadingProps> = {
  text: "Trusted by 10,000+ founders & business owners",
  className: "",
};

const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  {
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google Logo",
    text: "",
  },
  {
    logoImage:
      "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/framer.svg",
    alt: "Framer Logo",
    text: "Framer",
  },
  {
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple Logo",
    text: "Apple",
  },
  {
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
    alt: "LinkedIn Logo",
    text: "",
  },
  {
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    alt: "Microsoft Logo",
    text: "",
  },
];

// --- Animation Variants ---
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

// --- Main Component ---
export default function SocialProof1({
  className = "",
  heading,
  clientLogos = DEFAULT_CLIENT_LOGOS,
  velocitySpeed = 0.4,
  grayscale = true,
  animate = true,
}: LogoCloudProps) {
  // Deep-merge heading props so passing a partial object (like just { className }) won't overwrite default text
  const mergedHeading = {
    ...DEFAULT_HEADING,
    ...heading,
  };

  return (
    <section
      className={cn(
        "py-12 bg-white dark:bg-zinc-950 transition-colors duration-300",
        className,
      )}
    >
      {mergedHeading.text && (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInVariants}
          className={cn(
            "text-center text-sm md:text-lg font-medium text-zinc-500 dark:text-zinc-400 mb-8 tracking-tight px-4",
            mergedHeading.className,
          )}
        >
          {mergedHeading.text}
        </motion.h2>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInVariants}
        transition={{ delay: 0.15 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <InfiniteSlider
          velocitySpeed={velocitySpeed}
          useVelocity={false}
          animate={animate}
        >
          {clientLogos.map((company, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 mx-10 text-zinc-900 dark:text-zinc-100 font-medium transition-all duration-300 dark:invert-[0.15]",
                grayscale
                  ? "grayscale opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:opacity-100"
                  : "grayscale-0 opacity-100",
              )}
            >
              <img
                src={company.logoImage}
                alt={company.alt}
                className={cn(
                  "h-7 object-contain",
                  company.alt.toLowerCase().includes("apple") && "dark:invert",
                )}
              />
              {company.text && (
                <span className="text-xl font-bold tracking-tight">
                  {company.text}
                </span>
              )}
            </div>
          ))}
        </InfiniteSlider>
      </motion.div>
    </section>
  );
}

// --- Infinite Slider Helper ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface InfiniteSliderProps {
  children: React.ReactNode;
  velocitySpeed?: number;
  direction?: "left" | "right";
  useVelocity?: boolean;
  animate?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  velocitySpeed = 2,
  direction = "left",
  useVelocity = true,
  animate = true,
  className = "",
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [numCopies, setNumCopies] = useState(2);

  const baseX = useMotionValue(0);
  const unitWidth = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useFramerVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, (v) => {
    if (!useVelocity) return 0;
    return Math.min(5, (Math.abs(v) / 1000) * 5);
  });

  useEffect(() => {
    const updateSizes = () => {
      if (!containerRef.current || !blockRef.current) return;
      const cw = containerRef.current.offsetWidth;
      const bw = blockRef.current.scrollWidth;
      unitWidth.set(bw);
      const nextCopies = bw > 0 ? Math.ceil(cw / bw) + 2 : 2;
      setNumCopies(nextCopies);
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [children, unitWidth]);

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1;
    return `:$:{-wrap(0, width, Number(v))}px`;
  });

  useAnimationFrame((_, delta) => {
    if (!animate) return;
    const bw = unitWidth.get();
    if (bw <= 0) return;
    const dt = delta / 1000;
    const speedMultiplier = 1 + velocityFactor.get();
    const directionMultiplier = direction === "left" ? 1 : -1;
    const moveBy =
      directionMultiplier * velocitySpeed * 50 * speedMultiplier * dt;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={cn("relative w-full overflow-hidden py-4", className)}
      ref={containerRef}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div className="flex w-max items-center" style={{ x }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            className="flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
