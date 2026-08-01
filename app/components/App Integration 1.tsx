"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Zap,
  RefreshCw,
  Sparkles,
  Users,
  BarChart3,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
} from "lucide-react";

// --- Types ---
export interface AppLogo {
  logoImage: string;
  alt: string;
  bgClass?: string;
}

export interface TextProps {
  text?: string;
  className?: string;
}

export interface ButtonProps extends TextProps {
  variant?:
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface FeatureProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface AppIntegrations1Props {
  className?: string;
  heading?: TextProps;
  subheading?: TextProps;
  button?: ButtonProps;
  features?: FeatureProps[];
  leftDeckLogos?: AppLogo[];
  rightDeckLogos?: AppLogo[];
  duration?: number;
}

// --- Defaults & Mock Data ---
const DEFAULT_HEADING: Required<TextProps> = {
  text: "CRM integrations",
  className: "",
};

const DEFAULT_SUBHEADING: Required<TextProps> = {
  text: "Connect your entire CRM ecosystem effortlessly with pre-built integrations designed for sales teams, customer support, and marketing automation.",
  className: "",
};

const DEFAULT_BUTTON: ButtonProps = {
  text: "Explore integrations",
  variant: "default",
  className: "rounded-full px-6 py-3 font-semibold",
};

const DEFAULT_FEATURES: FeatureProps[] = [
  {
    title: "200+ CRM Connectors",
    icon: <Zap className="size-3" />,
  },
  {
    title: "Real-time Data Sync",
    icon: <RefreshCw className="size-3" />,
  },
  {
    title: "Advanced Analytics",
    icon: <BarChart3 className="size-3" />,
  },
  {
    title: "Multi-channel Support",
    icon: <MessageSquare className="size-3" />,
  },
];

// CRM-focused logo data
const LEFT_LOGOS: AppLogo[] = [
  {
    logoImage: "https://svgl.app/library/salesforce.svg",
    alt: "Salesforce",
  },
  {
    logoImage:
      "https://cdn.iconscout.com/icon/free/png-256/free-hubspot-logo-icon-svg-download-png-2944939.png",
    alt: "HubSpot",
  },
  {
    logoImage: "https://www.adenin.com/assets/logos/zoho-crm.svg",
    alt: "Zoho",
  },
  {
    logoImage: "https://svgl.app/library/microsoft.svg",
    alt: "Microsoft Dynamics",
  },
  {
    logoImage: "https://staging.svgrepo.com/show/355152/oracle.svg",
    alt: "Oracle",
  },
];

const RIGHT_LOGOS: AppLogo[] = [
  {
    logoImage: "https://svgl.app/library/slack.svg",
    alt: "Slack",
  },
  {
    logoImage: "https://svgl.app/library/gmail.svg",
    alt: "Gmail",
  },
  {
    logoImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Microsoft_Outlook_Icon_%282025%E2%80%93present%29.svg/960px-Microsoft_Outlook_Icon_%282025%E2%80%93present%29.svg.png",
    alt: "Outlook",
  },
  {
    logoImage: "https://svgl.app/library/zoom.svg",
    alt: "Zoom",
  },
  {
    logoImage: "https://svgl.app/library/calendly.svg",
    alt: "Calendly",
  },
  {
    logoImage: "https://svgl.app/library/notion.svg",
    alt: "Notion",
  },
];

// --- Entry Stagger Animation Variants ---
const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const leftItemVariants: Variants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const rightContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

// --- Main Component ---
export default function AppIntegration1({
  className = "",
  heading,
  subheading,
  button,
  features = DEFAULT_FEATURES,
  leftDeckLogos = LEFT_LOGOS,
  rightDeckLogos = RIGHT_LOGOS,
  duration = 18,
}: AppIntegrations1Props) {
  const mergedHeading = { ...DEFAULT_HEADING, ...heading };
  const mergedSubheading = { ...DEFAULT_SUBHEADING, ...subheading };
  const mergedButton = { ...DEFAULT_BUTTON, ...button };

  return (
    <section
      className={cn(
        "py-16 md:py-24 bg-neutral-100/50 dark:bg-zinc-900 transition-colors duration-300 overflow-hidden",
        className,
      )}
    >
      {/* Seamless CSS Keyframes for Hardware-Accelerated Sliding */}
      <style jsx global>{`
        /* Vertical Keyframes (Desktop) */
        @keyframes verticalScrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes verticalScrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        /* Horizontal Keyframes (Mobile) */
        @keyframes horizontalScrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes horizontalScrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-scroll-up {
          animation: horizontalScrollLeft var(--scroll-duration, 18s) linear
            infinite;
        }
        .animate-scroll-down {
          animation: horizontalScrollRight var(--scroll-duration, 18s) linear
            infinite;
        }

        @media (min-width: 1024px) {
          .animate-scroll-up {
            animation-name: verticalScrollUp;
          }
          .animate-scroll-down {
            animation-name: verticalScrollDown;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={leftContainerVariants}
            className="flex flex-col max-w-xl"
          >
            {mergedHeading.text && (
              <motion.h2
                variants={leftItemVariants}
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl font-normal text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight",
                  mergedHeading.className,
                )}
              >
                {mergedHeading.text}
              </motion.h2>
            )}

            {mergedSubheading.text && (
              <motion.p
                variants={leftItemVariants}
                className={cn(
                  "text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed",
                  mergedSubheading.className,
                )}
              >
                {mergedSubheading.text}
              </motion.p>
            )}

            {mergedButton.text && (
              <motion.div variants={leftItemVariants} className="mb-10">
                <button
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300",
                    mergedButton.variant === "default" || !mergedButton.variant
                      ? "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
                      : "",
                    mergedButton.variant === "outline"
                      ? "border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                      : "",
                    mergedButton.className,
                  )}
                >
                  {mergedButton.text}
                </button>
              </motion.div>
            )}

            {/* Features List */}
            <ul className="space-y-4 pt-12 sm:space-y-5">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  variants={leftItemVariants}
                  className={cn("flex items-center gap-4")}
                >
                  <div
                    className={`flex items-center bg-neutral-800 text-white justify-center size-7 rounded-full dark:border-zinc-800/80 shrink-0 mt-0.5 ${feature.className}`}
                  >
                    {feature.icon ?? (
                      <Sparkles className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-normal text-neutral-500 dark:text-zinc-100">
                      {feature.title}
                    </h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Content Area - Stacked vertically on mobile, side by side on desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={rightContainerVariants}
            className="flex flex-col lg:flex-row gap-6 lg:gap-6 justify-center items-center lg:justify-end relative w-full"
          >
            {/* Top Deck on Mobile / Left Deck on Desktop */}
            <ResponsiveDeck
              logos={leftDeckLogos}
              direction="up"
              duration={duration}
            />

            {/* Bottom Deck on Mobile / Right Deck on Desktop */}
            <ResponsiveDeck
              logos={rightDeckLogos}
              direction="down"
              duration={duration}
              className="lg:mt-16"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Responsive Deck Component ---
interface ResponsiveDeckProps {
  logos: AppLogo[];
  direction: "up" | "down";
  duration: number;
  className?: string;
}

function ResponsiveDeck({
  logos,
  direction,
  duration,
  className,
}: ResponsiveDeckProps) {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full lg:w-32 h-24 sm:h-32 lg:h-[520px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:[mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-row lg:flex-col items-center w-max lg:w-full",
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down",
        )}
        style={{ "--scroll-duration": `${duration}s` } as React.CSSProperties}
      >
        {duplicatedLogos.map((app, index) => (
          <motion.div
            key={index}
            variants={cardPopVariants}
            className="mx-2 lg:mx-0 lg:my-2.5 sm:lg:my-3 shrink-0"
          >
            <div
              className={cn(
                "flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl transition-all duration-300",
                "bg-neutral-200/40 dark:bg-neutral-800 shadow-sm border-none",
                app.bgClass,
              )}
            >
              <img
                src={app.logoImage}
                alt={app.alt}
                className={cn(
                  "w-8 h-8 sm:w-12 sm:h-12 object-contain",
                  // Dark mode invert for specific logos
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
