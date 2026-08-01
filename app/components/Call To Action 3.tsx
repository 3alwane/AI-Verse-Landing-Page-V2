
 "use client";
 
 import Link from "next/link";
 import React, { ReactNode, useState, useEffect } from "react";
 import { Button } from "@/components/ui/button";
 import { motion, Variants } from "framer-motion";
 import { ArrowUpRight } from "lucide-react";
 import {
   SiNextdotjs,
   SiPaypal,
   SiPostgresql,
   SiReact,
   SiShadcnui,
   SiTailwindcss,
   SiTypescript,
   SiVercel,
 } from "react-icons/si";
 
 interface CTA3Props {
   title?: { text: string | ReactNode; className?: string };
   description?: { text: string; className?: string };
   primaryButton?: { text: string; className?: string; href: string };
   leftIcons?: ReactNode[];
   rightIcons?: ReactNode[];
   iconContainerClassName?: string;
   className?: string;
   wordDelay?: number;
 }
 
 const LEFT_POSITIONS = [
   {
     top: "15%",
     horizontal: "15%",
     floatY: [-10, 15, -10],
     floatX: [-5, 10, -5],
     padding: "p-2.5",
     iconSize: "w-4 h-4",
   },
   {
     top: "45%",
     horizontal: "5%",
     floatY: [15, -10, 15],
     floatX: [5, -10, 5],
     padding: "p-5",
     iconSize: "w-7 h-7",
   },
   {
     top: "65%",
     horizontal: "22%",
     floatY: [-15, 10, -15],
     floatX: [-10, 5, -10],
     padding: "p-3",
     iconSize: "w-5 h-5",
   },
   {
     top: "80%",
     horizontal: "10%",
     floatY: [10, -15, 10],
     floatX: [10, -5, 10],
     padding: "p-4",
     iconSize: "w-6 h-6",
   },
   {
     top: "30%",
     horizontal: "28%",
     floatY: [-5, 10, -5],
     floatX: [-10, 15, -10],
     padding: "p-3.5",
     iconSize: "w-5 h-5",
   },
 ];
 
 const RIGHT_POSITIONS = [
   {
     top: "10%",
     horizontal: "15%",
     floatY: [10, -15, 10],
     floatX: [5, -10, 5],
     padding: "p-5",
     iconSize: "w-7 h-7",
   },
   {
     top: "35%",
     horizontal: "5%",
     floatY: [-15, 10, -15],
     floatX: [-5, 10, -5],
     padding: "p-3",
     iconSize: "w-4 h-4",
   },
   {
     top: "55%",
     horizontal: "16%",
     floatY: [15, -10, 15],
     floatX: [10, -5, 10],
     padding: "p-4",
     iconSize: "w-6 h-6",
   },
   {
     top: "80%",
     horizontal: "10%",
     floatY: [-10, 15, -10],
     floatX: [-10, 5, -10],
     padding: "p-2.5",
     iconSize: "w-4 h-4",
   },
   {
     top: "25%",
     horizontal: "58%",
     floatY: [5, -10, 5],
     floatX: [15, -10, 15],
     padding: "p-3.5",
     iconSize: "w-5 h-5",
   },
 ];
 
 // Word-by-word animation variants
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
     y: 12,
     scale: 0.8,
   },
   visible: {
     opacity: 1,
     y: 0,
     scale: 1,
     transition: {
       duration: 0.55,
       ease: [0.2, 0.65, 0.3, 0.9],
     },
   },
 };
 
 export function CallToAction3({
   title,
   description,
   primaryButton,
   leftIcons,
   rightIcons,
   iconContainerClassName = "",
   className = "",
   wordDelay = 0.08,
 }: CTA3Props) {
   const {
     text: descriptionText = "Leverage the power of Next.js, React, and cutting-edge technologies to build high-performance, production-ready applications with exceptional developer experience.",
     className: descriptionClassName = "",
   } = description || {};
 
   const {
     text: titleText = "Build Faster, Scale Smarter with Modern Full-Stack Development",
     className: titleClassName = "",
   } = title || {};
 
   const {
     text: primaryButtonText = "Start Building Now",
     className: primaryButtonClassName = "",
     href: primaryButtonHref = "#",
   } = primaryButton || {};
 
   const defaultLeftIcons = leftIcons || [
     <SiNextdotjs key="1" />,
     <SiReact key="2" />,
     <SiTypescript key="3" />,
     <SiTailwindcss key="4" />,
   ];
 
   const defaultRightIcons = rightIcons || [
     <SiVercel key="1" />,
     <SiPaypal key="2" />,
     <SiPostgresql key="3" />,
     <SiShadcnui key="4" />,
   ];
 
   const totalIcons = defaultLeftIcons.length + defaultRightIcons.length;
   const [randomDelays] = useState(() =>
     Array.from({ length: totalIcons }, () => Math.random() * 1.5),
   );
 
   // Track previous text values to detect changes
   const [prevTitleText, setPrevTitleText] = useState(titleText);
   const [prevDescText, setPrevDescText] = useState(descriptionText);
   const [titleKey, setTitleKey] = useState(0);
   const [descKey, setDescKey] = useState(0);
 
   // Update keys when text changes
   useEffect(() => {
     if (titleText !== prevTitleText) {
       setTitleKey((prev) => prev + 1);
       setPrevTitleText(titleText);
     }
   }, [titleText, prevTitleText]);
 
   useEffect(() => {
     if (descriptionText !== prevDescText) {
       setDescKey((prev) => prev + 1);
       setPrevDescText(descriptionText);
     }
   }, [descriptionText, prevDescText]);
 
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.2 },
     },
   };
 
   const itemVariants = {
     hidden: { opacity: 0, y: 20 },
     visible: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.6, ease: "easeOut" },
     },
   } as const;
 
   // Helper to render text word-by-word with proper key for updates
   const renderWordByWordText = (
     text: string | ReactNode,
     startDelay: number = 0,
     keySuffix: string | number = "text",
   ) => {
     if (typeof text !== "string") return text;
 
     const words = text.split(" ");
 
     return (
       <motion.span
         key={`word-animation-${keySuffix}`}
         custom={startDelay}
         variants={textWrapperVariants}
         initial="hidden"
         animate="visible"
         className="inline"
       >
         {words.map((word, index) => (
           <motion.span
             key={`${keySuffix}-${word}-${index}`}
             variants={wordVariants}
             transition={{ delay: index * wordDelay }}
             className="inline-block mr-[0.25em] last:mr-0"
           >
             {word}
           </motion.span>
         ))}
       </motion.span>
     );
   };
 
   const renderFloatingIcons = (
     icons: ReactNode[],
     isLeft: boolean,
     delayOffset: number,
   ) => {
     const positions = isLeft ? LEFT_POSITIONS : RIGHT_POSITIONS;
 
     return icons.map((icon, index) => {
       const pos = positions[index % positions.length];
       const delay = randomDelays[delayOffset + index];
 
       const sizedIcon = React.isValidElement(icon)
         ? React.cloneElement(
             icon as React.ReactElement<{ className?: string }>,
             {
               className: pos.iconSize,
             },
           )
         : icon;
 
       return (
         <motion.div
           key={`icon-${isLeft ? "left" : "right"}-${index}`}
           className="absolute z-0"
           style={{
             top: pos.top,
             [isLeft ? "left" : "right"]: pos.horizontal,
           }}
           initial={{ scale: 0, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{
             type: "spring",
             stiffness: 260,
             damping: 15,
             delay: delay,
           }}
         >
           <motion.div
             animate={{
               y: pos.floatY,
               x: pos.floatX,
             }}
             transition={{
               duration: 4 + (index % 3),
               repeat: Infinity,
               ease: "easeInOut",
             }}
             className={`bg-background border border-border border-neutral-100 dark:border-neutral-700 rounded-full shadow-sm text-primary rounded-ful flex items-center justify-center ${pos.padding} ${iconContainerClassName}`}
           >
             {sizedIcon}
           </motion.div>
         </motion.div>
       );
     });
   };
 
   return (
     <section
       className={`relative bg-neutral-50 dark:bg-neutral-900 w-full min-h-[600px] flex items-center justify-center bg-background py-24 ${className}`}
     >
       <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto pointer-events-none">
         {renderFloatingIcons(defaultLeftIcons, true, 0)}
         {renderFloatingIcons(defaultRightIcons, false, defaultLeftIcons.length)}
       </div>
 
       <motion.div
         className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center space-y-8"
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
       >
         <motion.div variants={itemVariants}>
           {typeof titleText === "string" ? (
             <h2
               className={`text-5xl lg:text-6xl font-medium text-neutral-700 dark:text-neutral-200 tracking-tight text-foreground ${titleClassName}`}
             >
               {renderWordByWordText(titleText, 0.2, titleKey)}
             </h2>
           ) : (
             <>{titleText}</>
           )}
         </motion.div>
 
         <motion.div variants={itemVariants}>
           <p
             className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${descriptionClassName}`}
           >
             {renderWordByWordText(descriptionText, 0.6, descKey)}
           </p>
         </motion.div>
 
         <motion.div variants={itemVariants} className="pt-4">
           <Button
             asChild
             className={`px-8 py-6 h-14 rounded-full bg-primary text-base font-medium shadow-lg hover:scale-105 transition-transform duration-300 ${primaryButtonClassName}`}
           >
             <Link href={primaryButtonHref} className="flex items-center gap-2">
               {primaryButtonText}
               <ArrowUpRight className="w-5 h-5" />
             </Link>
           </Button>
         </motion.div>
       </motion.div>
     </section>
   );
 }
 

