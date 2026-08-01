"use client";
import React, { ReactNode } from "react";
import {
  MdAutoGraph,
  MdOutlinePsychology,
  MdOutlineAutoMode,
  MdOutlineCenterFocusStrong,
  MdOutlineTune,
} from "react-icons/md";
import { RiRocket2Line } from "react-icons/ri";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SingleFeature10Card {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface FeatureSection10Props {
  sectionId?: string;
  cardData?: SingleFeature10Card[];
  featureBadge?: { text?: string; className?: string; icon?: ReactNode };
  heading?: { text?: string | ReactNode; className?: string };
  subHeading?: { text?: string | ReactNode; className?: string };
  className?: string;
  enableHover?: boolean;
}

const MotionBadge = motion.create(Badge);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  animate: { transition: { delay: 1.3 } },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.8 },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    borderColor: "rgba(209, 213, 219, 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  showBorder: {
    borderColor: "rgba(209, 213, 219, 0.3)",
    transition: { duration: 0.8, delay: 1 },
  },
} as const;

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

const FEATURES_DATA = [
  {
    icon: <MdOutlinePsychology size={42} />,
    title: "Predictive Scheduling",
    description:
      "Our AI analyzes historical velocity to automatically adjust timelines and predict delivery dates with 95% accuracy.",
  },
  {
    icon: <MdOutlineAutoMode size={42} />,
    title: "Automated Workflows",
    description:
      "Eliminate manual handoffs. AI agents automatically route tasks to the right team members based on skill sets and current bandwidth.",
  },
  {
    icon: <MdAutoGraph size={42} />,
    title: "Resource Optimization",
    description:
      "Instantly balance workloads across your entire organization to prevent burnout and ensure maximum efficiency.",
  },
  {
    icon: <MdOutlineCenterFocusStrong size={42} />,
    title: "Smart Risk Mitigation",
    description:
      "Detect potential project bottlenecks and scope creep before they happen with real-time sentiment and trend analysis.",
  },
  {
    icon: <MdOutlineTune size={42} />,
    title: "Adaptive Prioritization",
    description:
      "Your backlog stays organized 24/7. AI continuously re-ranks tasks based on shifting business goals and market demands.",
  },
  {
    icon: <RiRocket2Line size={42} />,
    title: "Intelligent Reporting",
    description:
      "Generate comprehensive project health reports in seconds using natural language queries instead of complex manual spreadsheets.",
  },
];

const FeatureSection10 = ({
  sectionId = "",
  cardData = FEATURES_DATA,
  featureBadge,
  heading,
  subHeading,
  className,
  enableHover = true,
}: FeatureSection10Props) => {
  const {
    text: badgeText = "AI-Powered Orchestration",
    className: badgeClassName = "",
    icon: featureBadgeIcon,
  } = featureBadge || {};

  const {
    text: titleText = (
      <h1 className={`text-4xl lg:text-5xl font-medium leading-tight`}>
        Master your workflows with <br />
        <span className="text-primary"> AI-driven project management</span>
      </h1>
    ),
    className: headingClassName = "",
  } = heading || {};

  const {
    text: subHeadingText = "Centralize all customer feedback, and instantly categorize and reveal the underlying drivers of negative customer experience across time",
    className: subHeadingClassName = "",
  } = subHeading || {};

  const cardsToDisplay = cardData;

  return (
    <section
      id={sectionId}
      className={`max-w-7xl mx-auto text-center py-14 ${className}`}
    >
      <MotionBadge
        variants={badgeVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        custom={0.1}
        className={`py-2 px-4 mb-6 w-fit mx-auto flex items-center justify-center ${badgeClassName}`}
        variant={"outline"}
      >
        {featureBadgeIcon && (
          <div className="mr-2 flex items-center">{featureBadgeIcon}</div>
        )}
        {badgeText}
      </MotionBadge>

      <motion.div
        variants={titleVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        custom={0.2}
        className="w-full max-w-5xl mx-auto"
      >
        {typeof titleText === "string" ? (
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-4 sm:mb-6 leading-tight max-w-7xl mx-auto ${headingClassName}`}
          >
            {titleText}
          </h1>
        ) : (
          <>{titleText}</>
        )}
      </motion.div>

      <motion.p
        variants={paragraphVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        custom={0.3}
        className={`opacity-70 text-lg md:text-xl max-w-5xl my-8 mx-auto mb-14 leading-relaxed ${subHeadingClassName}`}
      >
        {subHeadingText}
      </motion.p>

      {/* Grid Features */}
      <motion.div
        className="mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView={["visible", "showBorder"]}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 px-10 lg:px-0">
          {cardsToDisplay.slice(0, 6).map((feature, index) => {
            return (
              <SingleCardFeatureSection10
                key={index}
                feature={feature}
                index={index}
                totalFeatures={cardsToDisplay.length}
                enableHover={enableHover}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

function SingleCardFeatureSection10({
  index,
  totalFeatures,
  feature,
  enableHover,
}: {
  index: number;
  totalFeatures: number;
  feature: SingleFeature10Card;
  enableHover: boolean;
}) {
  const isFirstRowLg = index < 3;
  const isLastRowLg = index >= totalFeatures - (totalFeatures % 3 || 3);
  const isFirstColLg = index % 3 === 0;
  const isLastColLg = index % 3 === 2;
  const isFirstMobile = index === 0;
  const isLastMobile = index === totalFeatures - 1;

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      className={`
        flex flex-col items-center text-center p-8 border-gray-300/30
        ${enableHover && "hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-gray-600"}
        
        border-[0.5px] 
        border-l-0 border-r-0
        ${isFirstMobile ? "border-t-0" : "border-t-[0.5px]"}
        ${isLastMobile ? "border-b-0" : "border-b-[0.5px]"}

        lg:border-[0.5px]
        ${isFirstRowLg ? "lg:border-t-0" : "lg:border-t-[0.5px]"}
        ${isLastRowLg ? "lg:border-b-0" : "lg:border-b-[0.5px]"}
        ${isFirstColLg ? "lg:border-l-0" : "lg:border-l-[0.5px]"}
        ${isLastColLg ? "lg:border-r-0" : "lg:border-r-[0.5px]"}
        
        ${feature.className}
      `}
    >
      <div className="mb-6 text-black dark:text-white">{feature.icon}</div>
      <h3
        className={`text-[20px] font-medium mb-4 text-gray-900 dark:text-white ${feature.className}`}
      >
        {feature.title}
      </h3>
      <p className="opacity-80 leading-relaxed max-w-sm">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default FeatureSection10;
