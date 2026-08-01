"use client";

import { animate, motion, useInView, Variants } from "framer-motion";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface PricingSection5Props {
  sectionId?: string;
  className?: string;
  badge?: {
    mainText?: string;
    className?: string;
  };
  mainHeading?: { text?: string | ReactNode; className?: string };
  subHeading?: {
    text?: string;
    className?: string;
  };
  pricingCards?: Pricing5CardProp[];
}

export interface Pricing5CardProp {
  title?: string;
  price?: string;
  frequency?: string;
  description?: string;
  buttonText?: string;
  features?: string[];
  isPopular?: boolean;
  href?: string;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time between each header element
    },
  },
};

// Variants for individual text elements
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // Smooth quint ease
  },
};

function PricingSection5({
  badge,
  className = "",
  mainHeading,
  sectionId = "",
  subHeading,
  pricingCards,
}: PricingSection5Props) {
  // Updated data for the pricing plans
  const pricingPlans: Pricing5CardProp[] = pricingCards || [
    {
      title: "Starter",
      price: "0",
      frequency: "/ month",
      description: "Tools for creators and hobbyists",
      buttonText: "Start for Free",
      isPopular: false,
      features: [
        "Access to basic AI models",
        "3 dynamic AI agents",
        "Standard drag-and-drop builder",
        "Subdomain hosting included",
        "1,000 monthly site visits",
        "Community forum access",
      ],
      href: "/signup",
    },
    {
      title: "Pro",
      price: "49",
      frequency: "/ month",
      description: "Capabilities for growing teams",
      buttonText: "Upgrade to Pro",
      isPopular: true,
      features: [
        "Everything in Starter",
        "Unlimited AI agents (advanced)",
        "Full library of smart templates",
        "Custom domain integration",
        "25,000 monthly site visits",
        "Priority email support",
      ],
      href: "/pro-checkout",
    },
    {
      title: "Enterprise",
      price: "199",
      frequency: "/ month",
      description: "Maximum power and resources",
      buttonText: "Contact Sales",
      isPopular: false,
      features: [
        "Exclusive early-access models",
        "Dedicated agent GPU clusters",
        "Custom template development",
        "Multiple domain management",
        "Unlimited monthly site visits",
        "24/7 dedicated account manager",
      ],
      href: "/contact",
    },
  ];

  // Updated Header Texts
  const {
    text: mainHeadingText = "Scalable plans for every stage of growth",
    className: mainHeadingClassName,
  } = mainHeading || {};

  const {
    text: subHeadingText = "Choose the perfect plan to supercharge your workflow. From solo founders to global enterprises, we've got you covered.",
    className: subHeadingClassName,
  } = subHeading || {};

  const {
    mainText: badgeMainText = "Transparent Pricing",
    className: badgeClassName = "",
  } = badge || {};

  return (
    <section
      id={sectionId}
      className={`max-w-[1350px] mx-auto py-20 ${className}`}
    >
      {/* Header Section with Orchestrated Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible" // Triggers when scrolled into view
        viewport={{ once: true, margin: "-100px" }} // Triggers slightly after entering view
        variants={containerVariants}
        className="flex flex-col items-center"
      >
        {/* Animated Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <Badge
            variant="outline"
            className={`font-normal text-base px-3 py-1 rounded-full ${badgeClassName}`}
          >
            {badgeMainText}
          </Badge>
        </motion.div>

        {/* Heading and Subheading */}
        <header className="text-center mb-12">
          <div className={`mx-auto max-w-2xl ${mainHeadingClassName}`}>
            <motion.div variants={itemVariants}>
              {typeof mainHeadingText === "string" ? (
                <h1 className="text-3xl md:text-6xl font-medium mb-4 tracking-tight">
                  {mainHeadingText}
                </h1>
              ) : (
                <>{mainHeadingText}</>
              )}
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-lg pt-1 text-neutral-600 opacity-50 ${subHeadingClassName}`}
            >
              {subHeadingText}
            </motion.p>
          </div>
        </header>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="pb-9 mx-auto flex-col lg:flex-row flex gap-4 justify-center px-4">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.15, // Delay relative to the card's own entry
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PricingCard
              title={plan.title}
              price={plan.price}
              frequency={plan.frequency}
              description={plan.description}
              buttonText={plan.buttonText}
              features={plan.features}
              isPopular={plan.isPopular}
              className=""
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection5;

const PricingCard = ({
  title = "Pro",
  price = "299",
  frequency = "/ month",
  description = "Launch with advanced workflows",
  buttonText = "Get Started Now",
  features = [
    "Everything in Starter",
    "Unlimited AI agents (advanced)",
    "Builder with smart templates",
    "Custom domain support",
    "10,000 site visits/month",
    "Priority support",
  ],
  isPopular = true,
  href = "#",
  className,
}: Pricing5CardProp) => {
  const numericPrice = Number(price.replace(/[^0-9.]/g, "")) || 0;
  const [displayPrice, setDisplayPrice] = useState(0); // Start at 0 for the count-up

  const cardRef = useRef(null);
  // amount: 0.3 means trigger when 30% of the card is visible
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericPrice, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayPrice(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [numericPrice, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemLeftVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Card
      ref={cardRef}
      className={`w-full shadow-none rounded-[19px] h-full transition-all duration-300 ${
        isPopular ? "border-primary border-2  " : "border"
      } p-4 ${className}`}
    >
      <CardContent className="p-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className={`relative rounded-[14px] p-8 text-left ${
            isPopular ? "bg-primary/10" : "bg-[#F8F9FA] dark:bg-neutral-800"
          } ${className}`}
        >
          <motion.h3
            variants={itemLeftVariants}
            className="text-xl font-light text-gray-900 dark:text-white"
          >
            {title}
          </motion.h3>

          <motion.div
            variants={itemLeftVariants}
            className="mt-4 flex items-baseline gap-1"
          >
            <span className="text-6xl font-medium tracking-tight text-gray-900 dark:text-white">
              ${displayPrice}
            </span>
            <span className="text-lg dark:text-neutral-400">{frequency}</span>
          </motion.div>

          <motion.p
            variants={itemLeftVariants}
            className="mt-4   text-gray-500 dark:text-neutral-400"
          >
            {description}
          </motion.p>

          <motion.div variants={buttonVariants}>
            <Button
              asChild // Allows us to use an <a> tag inside the button for the href
              className={`mt-8 w-full shadow-none h-14 rounded-full text-lg font-medium transition-all ${
                isPopular
                  ? "bg-primary border-none hover:opacity-90"
                  : "bg-white text-primary border-gray-200 hover:bg-gray-50 border"
              }`}
            >
              <a href={href}>
                {buttonText}
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-12 px-4 pb-8">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[24px] font-medium text-neutral-900 dark:text-neutral-200 mb-8"
          >
            What's Included:
          </motion.h4>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemLeftVariants}>
                <div className="flex items-center gap-3 py-1">
                  <Check
                    className="h-6 w-6 text-neutral-600 dark:text-neutral-400 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-[19px] text-neutral-600 dark:text-neutral-400 font-light">
                    {feature}
                  </span>
                </div>
                {index !== features.length - 1 && (
                  <Separator className="mt-4 bg-neutral-200/60   dark:bg-neutral-800/60" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
