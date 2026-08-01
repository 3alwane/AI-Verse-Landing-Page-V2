"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";

// Created outside component to prevent re-renders
const MotionButton = motion(Button);

export interface HeroSection12Props {
  className?: string;
  mainHeading?: { text?: string | ReactNode; className?: string };
  subHeading?: { text?: string; className?: string };
  badgeFeature?: { tag?: string; text?: string; className?: string };
  primaryButton?: {
    text?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    className?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    isVisible?: boolean;
    text?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    className?: string;
    onClick?: () => void;
  };
  socialProof?: {
    avatars?: string[];
    rating?: string;
    ratingText?: string;
  };
  hideSocialProof?: boolean;
  image?: {
    src?: string;
    alt?: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                               ANIMATION VARIANTS                           */
/* -------------------------------------------------------------------------- */

// 1. Badge: Left-to-Right Slide
const badgeVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

// 2. Word-by-Word Blur Reveal
const textWrapperVariants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: customDelay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

// 3. Stampy Buttons
const buttonContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.1,
    },
  },
};

const buttonStampVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 18,
    },
  },
};

// 4. Avatars Waving Pop-Up Effect
const avatarContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.35,
    },
  },
};

const avatarWaveItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 25, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 14,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                DEFAULT DATA                                */
/* -------------------------------------------------------------------------- */

const DEFAULT_AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function HeroSection12({
  badgeFeature,
  mainHeading,
  subHeading,
  primaryButton,
  secondaryButton,
  socialProof,
  hideSocialProof = false,
  image,
  className = "",
}: HeroSection12Props) {
  const {
    tag: badgeTag = "New Feature",
    text: badgeFeatureText = "AI-Powered Workflow Automation",
    className: badgeFeatureClassName = "",
  } = badgeFeature || {};

  const {
    text: mainHeadingText = "Work Smarter, Deliver Faster with Taskora",
    className: mainHeadingClassName = "",
  } = mainHeading || {};

  const {
    text: subHeadingText = "Taskora helps modern teams manage projects, automate routine tasks, and hit deadlines with effortless clarity.",
    className: subHeadingClassName = "",
  } = subHeading || {};

  const {
    text: primaryBtnText = "Start Free Trial",
    variant: primaryBtnVariant = "default",
    onClick: onPrimaryClick = () => {},
    className: primaryBtnClassName = "",
  } = primaryButton || {};

  const {
    isVisible: isSecondaryButtonVisible = true,
    text: secondaryBtnText = "Watch Demo",
    variant: secondaryBtnVariant = "outline",
    onClick: onSecondaryClick = () => {},
    className: secondaryBtnClassName = "",
  } = secondaryButton || {};

  const {
    avatars = DEFAULT_AVATARS,
    rating = "4.9/5",
    ratingText = "Trusted by 10,000+ teams worldwide",
  } = socialProof || {};

  // Helper to render text word-by-word with blur reveal
  // Helper to render text word-by-word with blur reveal
  const renderBlurText = (text: string | ReactNode, startDelay: number = 0) => {
    // 1. Handle standard strings (split into words)
    if (typeof text === "string") {
      const words = text.split(" ");
      return (
        <motion.span
          custom={startDelay}
          variants={textWrapperVariants}
          initial="hidden"
          animate="visible"
          className="inline"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      );
    }

    // 2. Handle React Nodes (JSX)
    return (
      <motion.span
        custom={startDelay}
        variants={textWrapperVariants}
        initial="hidden"
        animate="visible"
        className="inline-block w-full"
      >
        {React.Children.map(text, (child, index) => (
          <motion.span
            key={`custom-node-${index}`}
            variants={wordVariants}
            className="inline-block"
          >
            {child}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <section
      className={`relative w-full overflow-hidden py-16 lg:py-10 bg-background text-foreground transition-colors duration-300 ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center min-h-[600px] lg:min-h-[700px]">
        {/* LEFT COLUMN: TEXT CONTENT (Centered on mobile, left-aligned on lg) */}
        <div className="w-full lg:w-[60%] max-w-[640px] flex flex-col items-center text-center lg:items-start lg:text-left z-20 relative">
          {/* BADGE */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <Badge
              variant="outline"
              className={`rounded-full py-1 px-1 pr-4 bg-background/20 backdrop-blur-md border-border/40 flex items-center gap-3 ${badgeFeatureClassName}`}
            >
              <span className="bg-primary/20 backdrop-blur-sm text-primary text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                {badgeTag}
              </span>
              <span className="text-foreground/90 text-sm font-medium">
                {badgeFeatureText}
              </span>
            </Badge>
          </motion.div>

          {/* MAIN HEADING */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.05] tracking-tight ${mainHeadingClassName}`}
          >
            {renderBlurText(mainHeadingText, 0.2)}
          </h1>

          {/* SUBHEADING */}
          <p
            className={`text-lg text-muted-foreground mt-6 max-w-md mx-auto lg:mx-0 leading-relaxed ${subHeadingClassName}`}
          >
            {renderBlurText(subHeadingText, 0.6)}
          </p>

          {/* BUTTONS */}
          <motion.div
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 w-full sm:w-auto"
          >
            <MotionButton
              variants={buttonStampVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              variant={primaryBtnVariant}
              onClick={onPrimaryClick}
              className={`w-full sm:w-auto rounded-xl px-8 h-12 text-base font-semibold ${primaryBtnClassName}`}
            >
              {primaryBtnText}
            </MotionButton>

            {isSecondaryButtonVisible && (
              <MotionButton
                variants={buttonStampVariants}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                variant={secondaryBtnVariant}
                onClick={onSecondaryClick}
                className={`w-full sm:w-auto rounded-xl px-8 h-12 text-base font-semibold ${secondaryBtnClassName}`}
              >
                {secondaryBtnText}
              </MotionButton>
            )}
          </motion.div>

          {/* SOCIAL PROOF / AVATARS */}
          {!hideSocialProof && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col items-center lg:items-start mt-10 gap-3"
            >
              <motion.div
                variants={avatarContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex -space-x-3"
              >
                {avatars.map((avatarUrl, i) => (
                  <motion.div
                    key={i}
                    variants={avatarWaveItemVariants}
                    className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden shadow-md"
                  >
                    <img
                      src={avatarUrl}
                      alt={`User avatar ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* STACKED RATING & DESCRIPTION */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="flex flex-col items-center lg:items-start text-md"
              >
                <div className="font-medium text-foreground flex items-center justify-center lg:justify-start gap-1">
                  <span>{rating}</span>
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Rating</span>
                </div>
                <span className="text-muted-foreground font-medium text-xs sm:text-md mt-0.5">
                  {ratingText}
                </span>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: 3D IMAGE OR UI PLACEHOLDER ASSEMBLY */}
        <div className="w-full lg:w-[68%] lg:absolute lg:right-[-17%] lg:top-1/2 lg:-translate-y-1/2 min-h-[450px] lg:min-h-[750px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0 perspective-[2500px] pointer-events-none z-10">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.05,
              rotateY: 15,
              rotateX: 10,
              skewY: 5,
              x: 50,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: -22,
              rotateX: 10,
              rotateZ: 10,
              skewY: -3,
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              delay: 0.3,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[850px] pointer-events-auto"
          >
            {/* Front Container with Masking */}
            <div
              className="relative bg-card text-card-foreground border border-border rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden z-10"
              style={{
                transform: "translateZ(0px)",
                WebkitMaskImage:
                  "linear-gradient(to top left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%)",
                maskImage:
                  "linear-gradient(to top left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%)",
              }}
            >
              {image?.src ? (
                <img
                  src={image.src}
                  alt={image.alt || "Dashboard UI Preview"}
                  className="w-full  border-none rounded-2xl"
                />
              ) : (
                /* CLEAN IMAGE PLACEHOLDER */
                <div className="w-full pt-6 sm:pt-20 h-[320px] sm:h-[579px] bg-muted/20 sm:bg-muted/30 border border-border/60 rounded-2xl flex flex-col items-center justify-center gap-3 p-8">
                  <div className="w-14 h-14 rounded-2xl bg-muted/80 border border-border/50 flex items-center justify-center shadow-sm">
                    <svg
                      className="w-7 h-7 text-muted-foreground/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-muted-foreground/80 tracking-tight">
                    Product Dashboard Preview
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
