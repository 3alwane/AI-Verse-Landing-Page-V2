

 import React from "react";
import { motion } from "framer-motion";

const DEFAULT_TESTIMONIALS = [
  {
    text: "Nexus has completely transformed how our engineering team handles sprint planning and blocker resolutions. It’s like having an extra pair of expert hands.",
    name: "Alex V.",
    position: "VP of Engineering, HyperScale",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    text: "The speed and clarity Nexus brings to our daily client syncs is unmatched. We’ve cut our status-update overhead by at least 60%.",
    name: "Sophia L.",
    position: "Chief Product Officer, Veloce",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    text: "Every other platform overpromises and underdelivers. Nexus actually delivers reliable automation that our non-technical staff can use effortlessly.",
    name: "Marcus D.",
    position: "Founder & CEO, Apex Digital",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    text: "An absolute game-changer for cross-functional alignment. Our marketing and design squads are finally completely in sync without endless meetings.",
    name: "Elena P.",
    position: "Head of Brand Strategy, Lumina",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function Testimonials6({
  className,
  testimonials = DEFAULT_TESTIMONIALS,
  sectionId = "",
  testimonialBadge,
  heading,
  subheading,
  Speed = 70,
}: {
  className?: string;
  sectionId?: string;
  testimonialBadge?: { text?: string; className?: string };
  heading?: { text?: string | React.ReactNode; className?: string };
  subheading?: { text?: string; className?: string };
  testimonials?: Array<{
    text: string;
    name: string;
    position: string;
    avatar: string;
  }>;
  Speed?: number;
} = {}) {
  // Merge parent props with default object values and append classNames safely
  const badgeProps = {
    text: testimonialBadge?.text ?? "Trusted By Innovators",
    className: `text-sm font-medium text-primary ${testimonialBadge?.className || ""}`,
  };

  const headingProps = {
    text: heading?.text ?? (
      <>
        Built For Teams Moving <br className="hidden md:block" />
        At The Speed of Modern Tech
      </>
    ),
    className: `text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight ${heading?.className || ""}`,
  };

  const subheadingProps = {
    text:
      subheading?.text ??
      "Discover why high-performing organizations choose Nexus to streamline their workflows and scale up productivity.",
    className: `text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto ${subheading?.className || ""}`,
  };

  // Duplicate the array for a seamless infinite loop
  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      id={sectionId}
      className={`py-24 ${className || ""}`}
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        contain: "layout inline-size",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll ${Speed}s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl font-medium mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        {/* Badge First */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="inline-block mb-3"
        >
          <span className={badgeProps.className}>{badgeProps.text}</span>
        </motion.div>

        {/* Heading Second */}
        <motion.h2
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`max-w-3xl mx-auto ${headingProps.className}`}
        >
          {headingProps.text}
        </motion.h2>

        {/* Sub Heading Last */}
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={subheadingProps.className}
        >
          {subheadingProps.text}
        </motion.p>
      </div>

      <div
        className="relative flex items-center"
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.1) 92%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.1) 92%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Marquee Track */}
        <div className="flex w-max animate-infinite-scroll gap-6 px-4 py-6">
          {infiniteTestimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -8,
                rotate: -1,
                scale: 1.02,
                transition: {
                  duration: 0.2,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0 w-[380px] p-3 rounded-[22px] bg-gray-100/40 dark:bg-zinc-800/40 backdrop-blur-md transition-all duration-300 hover:bg-transparent"
            >
              {/* Main Card Content */}
              <div className="group relative bg-white dark:bg-neutral-800 border-none flex flex-col justify-between w-full min-h-[420px] p-6 rounded-[20px] bg-transparent border border-gray-200/80 dark:border-zinc-800/80 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-br hover:from-primary hover:to-primary/80 hover:shadow-2xl">
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300 text-lg leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex flex-col items-start gap-4 mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-14 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-white/30 transition-all duration-300"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



