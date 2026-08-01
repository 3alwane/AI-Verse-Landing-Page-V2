"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VariantProps } from "class-variance-authority";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

type ButtonProps = {
  text?: string;
  className?: string;
  variant?: ButtonVariant;
};

type BaseInputProps = {
  placeholder?: string;
  className?: string;
  caption?: string;
};

type ControlledInputProps = BaseInputProps & {
  onSubmit: (email: string) => void;
  value: string;
  setValue: (email: string) => void;
};

type UncontrolledInputProps = BaseInputProps & {
  onSubmit?: never;
  value?: never;
  setValue?: never;
};

type InputProps = ControlledInputProps | UncontrolledInputProps;

interface Newsletter1Props {
  sectionId?: string;
  heading?: { text?: string | ReactNode; className?: string };
  subheading?: { text?: string; className?: string };
  button?: ButtonProps;
  featureBadge?: { shortText?: string; longText?: string; className?: string };
  inputElement?: InputProps;
}

export default function Newsletter2({
  sectionId = "",
  heading,
  subheading,
  button,
  featureBadge,
  inputElement,
}: Newsletter1Props) {
  const {
    shortText: badgeText = "Join",
    longText = "  Start collaboration project",
    className: badgeClassName = "",
  } = featureBadge || {};

  const {
    text: titleText = "Smarter Way to Manage Your Projects",
    className: titleClassName = "",
  } = heading || {};

  const {
    text: descriptionText = "Streamline collaboration, track progress, and hit every deadline—effortlessly.",
    className: descriptionClassName = "",
  } = subheading || {};

  const {
    text: buttonText = "Subscribe",
    className: buttonClassName = "",
    variant: variantButton = "default",
  } = button || {};

  const {
    className = "",
    onSubmit,
    placeholder = "Your email",
    value,
    setValue,
    caption = "",
  } = inputElement || {};

  const [email, setEmail] = useState("");

  const isEmailInputControlled = value !== undefined && setValue !== undefined;

  const currentValue = isEmailInputControlled ? value : email;
  const setCurrentValue = isEmailInputControlled ? setValue : setEmail;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(currentValue);
    }
    setCurrentValue("");
  };

  return (
    <section
      id={sectionId}
      className="w-full py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-5xl p-16 px-14 max-lg:mx-8 max-md:mx-0 rounded-3xl max-md:rounded-none text-center bg-primary/10">
        <div className="space-y-8">
          {/* Badge: Pop up from the center with a bouncy effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 18,
              delay: 0.2,
            }}
            className="flex border-primary dark:bg-neutral-900 justify-center items-center border py-[7px] mx-auto w-fit px-3 bg-white rounded-full"
          >
            <Badge
              className={`bg-primary max-sm:hidden text-[13px] text-primary-foreground px-4 py-[3px] shadow-none rounded-full font-medium ${badgeClassName}`}
            >
              {badgeText}
            </Badge>
            <span className="ml-3 mr-1 text-primary">{longText}</span>
          </motion.div>

          {/* Heading & Subheading: Snappy spring entrance */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 20,
              delay: 0.4,
            }}
            className="space-y-4 mb-5"
          >
            {typeof titleText !== "string" ? (
              <div>{titleText}</div>
            ) : (
              <h1
                className={`text-5xl md:text-6xl font-medium max-w-2xl mx-auto leading-tight ${titleClassName}`}
              >
                {titleText}
              </h1>
            )}

            <p
              className={`text-lg text-slate-600 pt-2  max-w-3xl mx-auto ${descriptionClassName}`}
            >
              {descriptionText}
            </p>
          </motion.div>

          {/* Email Form Container */}
          <div className="flex justify-center mt-6">
            <div className="w-full max-w-md relative">
              {/* Email Input: Comes up from the center */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Input
                  type="email"
                  placeholder={placeholder}
                  className={`w-full pl-6 pr-32 py-4 dark:text-white shadow-none border h-16 border-none rounded-full bg-white dark:bg-neutral-900 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              </motion.div>

              {/* Button: Appears from right to left with a snappy effect */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  delay: 0.8,
                }}
                className="absolute right-[10px] top-[12%] transform -translate-y-1/2"
              >
                <Button
                  onClick={handleSubmit}
                  variant={variantButton}
                  className={`px-6 py-2 shadow-none h-12 rounded-full bg-primary text-primary-foreground ${buttonClassName}`}
                >
                  {buttonText}
                </Button>
              </motion.div>
            </div>
          </div>

          {caption && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-sm mt-4"
            >
              {caption}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
