
 import { ReactNode } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { Button } from "@/components/ui/button";
import { MdBolt } from "react-icons/md";
import { motion } from "framer-motion";

interface SocialLink {
  href: string;
  icon: IconType;
}

interface FooterNavigation {
  [key: string]: { label: string; href: string }[];
}

export interface BigTextConfig {
  value?: string;
  className?: string;
  textSize?: number | string;
  letterSpacing?: number | string;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { href: "#", icon: FaTwitter },
  { href: "#", icon: SiThreads },
  { href: "#", icon: FaLinkedin },
  { href: "#", icon: FaLinkedin },
];

const DEFAULT_FOOTER_NAVIGATION: FooterNavigation = {
  Workflows: [
    { label: "Lead enrichment", href: "#" },
    { label: "Inbound triage", href: "#" },
    { label: "Ticket triage", href: "#" },
  ],
  Company: [
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

const DEFAULT_BIG_TEXT_CONFIG: Required<BigTextConfig> = {
  value: "STACK",
  className:
    "font-black uppercase text-neutral-300 dark:text-neutral-800 leading-[0.95]",
  textSize: 30,
  letterSpacing: -4,
};

const DEFAULT_LOGO: ReactNode = (
  <MdBolt size={28} className="text-neutral-600 dark:text-neutral-100" />
);

interface Footer4Props {
  sectionId?: string;
  website?: string;
  logo?: ReactNode;
  description?: string;
  classname?: string;
  socialLinks?: SocialLink[];
  footerNavigation?: FooterNavigation;
  bigText?: BigTextConfig;
}

export default function Footer5({
  sectionId = "",
  website = "Bolt Stack",
  logo = DEFAULT_LOGO,
  description = "Boltstack.dev: Fast-track your Next.js SaaS Boilerplate kit and reusable Shadcn ui blocks library. Build stunning UIs quickly and efficiently.",
  classname,
  footerNavigation = DEFAULT_FOOTER_NAVIGATION,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  bigText: bigTextProp,
}: Footer4Props) {
  const normalizeLetterSpacing = (value: number | string): string => {
    if (typeof value === "number") return `${value}px`;
    const trimmed = value.trim();
    if (/^-?d+(.d+)?$/.test(trimmed)) return `${trimmed}px`;
    return trimmed;
  };

  const bigText: Required<BigTextConfig> = {
    value: bigTextProp?.value ?? DEFAULT_BIG_TEXT_CONFIG.value,
    className: bigTextProp?.className ?? DEFAULT_BIG_TEXT_CONFIG.className,
    textSize: bigTextProp?.textSize ?? DEFAULT_BIG_TEXT_CONFIG.textSize,
    letterSpacing:
      bigTextProp?.letterSpacing ?? DEFAULT_BIG_TEXT_CONFIG.letterSpacing,
  };

  const computedTextSize =
    typeof bigText.textSize === "number"
      ? `${bigText.textSize}cqw`
      : bigText.textSize;

  const computedLetterSpacing = normalizeLetterSpacing(bigText.letterSpacing);

  // -------- Animation Variants --------

  const bigTextContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as const;

  const bigTextChildVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 18,
        mass: 0.9,
        duration: 0.8,
      },
    },
  } as const;

  const leftSlideVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  } as const;

  const descriptionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  } as const;

  const socialContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const socialLabelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      },
    },
  } as const;

  const socialButtonVariants = {
    hidden: { opacity: 0, x: 40, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        duration: 0.6,
      },
    },
  } as const;

  const navContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const navTitleVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5,
      },
    },
  } as const;

  const navItemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -6 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 14,
        duration: 0.5,
      },
    },
  } as const;

  // -------- Render Helper Components --------

  function WebsiteAndSocialMediaSection() {
    return (
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <motion.div
          className="flex items-center gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftSlideVariants}
        >
          {logo}
          <span className="font-semibold text-2xl tracking-tight text-neutral-600 dark:text-neutral-100">
            {website}
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 flex-wrap justify-center sm:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={socialContainerVariants}
        >
          <motion.span
            variants={socialLabelVariants}
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
          >
            Social media
          </motion.span>
          <div className="flex items-center space-x-2">
            {socialLinks.map((link, index) => (
              <motion.div key={index} variants={socialButtonVariants}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-200"
                  asChild
                >
                  <a href={link.href} aria-label={`Social link ${index + 1}`}>
                    <link.icon className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  function NavigationSection() {
    return (
      <motion.div
        className="flex flex-wrap max-sm:flex-col justify-end gap-x-14 gap-y-8 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={navContainerVariants}
      >
        {Object.entries(footerNavigation).map(([title, links]) => (
          <div
            key={title}
            className="flex flex-col items-center sm:items-start flex-0 min-w-[150px]"
          >
            <motion.div
              variants={navTitleVariants}
              className="mb-4 flex items-center font-semibold text-base text-neutral-900 dark:text-neutral-100"
            >
              {title}
            </motion.div>
            <ul className="space-y-3 text-center sm:text-left">
              {links.map((link) => (
                <motion.li key={link.label} variants={navItemVariants}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    );
  }

  // -------- Main Footer --------

  return (
    <footer
      id={sectionId}
      className={`relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 pt-10 pb-6 px-4 sm:px-6   ${classname || ""}`}
    >
      <div className="@container relative z-10 max-w-7xl mx-auto flex flex-col min-h-[400px]">
        <WebsiteAndSocialMediaSection />

        <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-800 my-6" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-10 flex-1">
          <motion.div
            className="w-full lg:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={descriptionVariants}
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0 text-center lg:text-left">
              {description}
            </p>
          </motion.div>

          <div className="w-full lg:w-2/3">
            <NavigationSection />
          </div>
        </div>

        {/* Big Text – Absolute on mobile (flush bottom), in-flow on desktop */}
        <div
          className={`
            w-full flex justify-center pointer-events-none select-none z-0
            absolute inset-x-0 bottom-0
            lg:relative lg:inset-auto lg:bottom-auto   -mb-16 lg:-mb-40
          `}
        >
          <motion.div
            className={bigText.className}
            style={{
              fontSize: computedTextSize,
              letterSpacing: computedLetterSpacing,
              whiteSpace: "nowrap",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 10%, black 70%)",
              maskImage:
                "linear-gradient(to bottom, transparent 10%, black 70%)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={bigTextContainerVariants}
          >
            {bigText.value.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={bigTextChildVariants}
                style={{ display: "inline-block" }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-8 lg:mt-12">
          <div className="text-center sm:text-left">
            <span>© 2026 {website}. All Right Reserved.</span>
          </div>
          <div className="text-center sm:text-right">
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


