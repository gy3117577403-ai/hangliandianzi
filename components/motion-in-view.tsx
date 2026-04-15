"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

type MotionInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof directionVariants;
};

export function MotionInView({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionInViewProps) {
  const variants = directionVariants[direction] ?? directionVariants.up;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={variants}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
