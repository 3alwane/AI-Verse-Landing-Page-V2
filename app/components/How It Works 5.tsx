"use client";

import React, { ReactNode, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  Variants,
  useReducedMotion,
} from "framer-motion";
import { FileQuestion, Zap } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const stampSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
};

const badgeVariant: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...stampSpring, delay: i },
  }),
};

const titleVariant: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...stampSpring, delay: i },
  }),
};

const paragraphVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: i,
    },
  }),
};

// Cards pop up from bottom with stamp spring
const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...stampSpring,
      delay: 0.8 + i * 0.15,
    },
  }),
};

interface TabContent {
  id: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    href?: string;
    layout?: "object-cover" | "object-contain";
  };
}

interface TabItem {
  id: string;
  tabContent: TabContent;
  className?: string;
}

const MotionBadge = motion.create(Badge);

// SaaS‑oriented mock data
const TAB_ITEMS_DATA: TabItem[] = [
  {
    id: "workflows",
    tabContent: {
      id: "workflows-content",
      title: "Automated workflows",
      description:
        "Build powerful automations with a visual editor. No code required.",
      image: {
        alt: "Visual workflow builder",
        src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1000&auto=format&fit=crop",
        layout: "object-cover",
      },
    },
  },
  {
    id: "analytics",
    tabContent: {
      id: "analytics-content",
      title: "Real‑time analytics",
      description:
        "Track every metric that matters. Live dashboards and custom reports.",
      // No image to show placeholder
    },
  },
  {
    id: "integrations",
    tabContent: {
      id: "integrations-content",
      title: "Seamless integrations",
      description:
        "Connect your favorite tools. Sync data across platforms in one click.",
      image: {
        alt: "Integration hub",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        layout: "object-cover",
      },
    },
  },
];

interface HowItWorks5Props {
  sectionId?: string;
  tabItems?: TabItem[];
  featureBadge?: { text?: string; className?: string; icon?: ReactNode };
  heading?: { text?: string | ReactNode; className?: string };
  subHeading?: { text?: string | ReactNode; className?: string };
  className?: string;
}

export default function HowItWorks5({
  sectionId = "",
  tabItems = TAB_ITEMS_DATA,
  featureBadge,
  heading,
  subHeading,
  className,
}: HowItWorks5Props) {
  const reducedMotion = useReducedMotion();

  const {
    text: badgeText = "How it works",
    className: badgeClassName = "",
    icon: featureBadgeIcon = <Zap size={18} />,
  } = featureBadge || {};

  const {
    text: titleText = "Everything You Need To Scale",
    className: headingClassName = "",
  } = heading || {};

  const {
    text: subHeadingText = "Powerful features to help you automate, analyze, and integrate — all in one place.",
    className: subHeadingClassName = "",
  } = subHeading || {};

  const [activeTab, setActiveTab] = useState<string>(
    tabItems.length > 0 ? tabItems[0].id : "",
  );

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id={sectionId}
      className={cn(
        "w-full max-w-7xl text-center px-4 sm:px-16 py-16 mx-auto bg-neutral-50/60 dark:bg-neutral-950 rounded-[40px]",
        className,
      )}
    >
      {/* Badge: triggered only when in view */}
      <MotionBadge
        variants={badgeVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        custom={0.3}
        className={cn(
          "py-2 px-4 mb-6 w-fit mx-auto rounded-full text-base  flex items-center justify-center font-normal",
          badgeClassName,
        )}
        variant="secondary"
      >
        {featureBadgeIcon && (
          <div className="mr-2 flex items-center opacity-70">
            {featureBadgeIcon}
          </div>
        )}
        {badgeText}
      </MotionBadge>

      {/* Title: triggered only when in view */}
      <motion.div
        variants={titleVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        custom={0.4}
        className="w-full mt-4 max-w-2xl   mx-auto"
      >
        {typeof titleText === "string" ? (
          <h1
            className={cn(
              "text-4xl sm:text-6xl font-medium tracking-normal  text-neutral-950 dark:text-white",
              headingClassName,
            )}
          >
            {titleText}
          </h1>
        ) : (
          <>{titleText}</>
        )}
      </motion.div>

      {/* Subheading: triggered only when in view */}
      {subHeadingText && (
        <motion.div
          variants={paragraphVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          custom={0.5}
          className="w-full max-w-2xl mx-auto"
        >
          {typeof subHeadingText === "string" ? (
            <p
              className={cn(
                "text-neutral-600 text-lg sm:text-xl mt-5 mb-14 leading-relaxed dark:text-neutral-400",
                subHeadingClassName,
              )}
            >
              {subHeadingText}
            </p>
          ) : (
            <div className={cn("mt-5 mb-14", subHeadingClassName)}>
              {subHeadingText}
            </div>
          )}
        </motion.div>
      )}

      {/* Accordion Container */}
      <motion.div
        // Desktop: container triggers staggered card animations
        // Mobile: no container-level animation (cards handle themselves)
        initial={isMobile ? undefined : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={isMobile ? undefined : { once: true, amount: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 w-full p-2 bg-[#F6F5F2]/60 rounded-[2.5rem] dark:bg-neutral-900/40"
      >
        {tabItems.map((tab, index) => {
          // On desktop, active only when hovered. On mobile, never "active".
          const isActive = !isMobile && activeTab === tab.id;
          // On mobile, always show the image. On desktop, only if active.
          const showImage = isMobile || isActive;
          const itemNumber = String(index + 1).padStart(2, "0");
          const imageSrc = tab.tabContent.image?.src;
          const imageLayout = tab.tabContent.image?.layout || "object-cover";

          return (
            <motion.div
              key={tab.id}
              custom={isMobile ? 0 : index}
              variants={reducedMotion ? {} : cardEntryVariants}
              layout={reducedMotion ? false : true}
              onMouseEnter={isMobile ? undefined : () => setActiveTab(tab.id)}
              transition={{
                layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
              }}
              initial={isMobile ? "hidden" : undefined}
              whileInView={isMobile ? "visible" : undefined}
              viewport={
                isMobile
                  ? { once: true, amount: 0.7 } // 👈 threshold raised to 0.7
                  : undefined
              }
              className={cn(
                "relative rounded-[2.5rem] bg-white p-6 sm:p-8 overflow-hidden cursor-pointer transition-shadow",
                "border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800",
                "flex flex-col lg:flex-row max-lg:h-auto lg:h-[460px]",
                isActive
                  ? "lg:flex-[3] shadow-xl shadow-neutral-100/40 dark:shadow-black/20"
                  : "lg:flex-[1] lg:min-w-[220px] shadow-sm",
                tab.className,
              )}
            >
              {/* Text Content Block – always left aligned */}
              <div className="flex flex-col justify-between h-full relative z-10 w-full lg:w-[220px] xl:w-[240px] shrink-0">
                <span className="text-neutral-400/80 text-xl font-light dark:text-neutral-600 block text-left">
                  {itemNumber}
                </span>

                <div className="mt-8 lg:mt-0 text-left">
                  <h3 className="text-3xl font-medium text-neutral-950 tracking-tight mb-3 dark:text-white">
                    {tab.tabContent.title}
                  </h3>
                  <p className="text-neutral-600 text-lg pr-9 leading-relaxed dark:text-neutral-400">
                    {tab.tabContent.description}
                  </p>
                </div>
              </div>

              {/* Visuals / Image Block */}
              <AnimatePresence mode="wait">
                {showImage && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className={cn(
                      "max-lg:relative max-lg:mt-6 max-lg:h-[260px] max-lg:w-full",
                      "lg:relative lg:flex-1 lg:ml-6 lg:min-w-0 lg:h-auto",
                      "rounded-[2rem] overflow-hidden bg-neutral-100 dark:bg-neutral-800",
                    )}
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={tab.tabContent.image?.alt || "Visual guide"}
                        className={cn(
                          "w-full h-full object-top shadow-inner",
                          imageLayout,
                        )}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-600 gap-3 border border-neutral-200 dark:border-neutral-700 rounded-[2rem]">
                        <FileQuestion size={48} strokeWidth={1} />
                        <span className="font-medium text-sm">
                          No preview available
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
