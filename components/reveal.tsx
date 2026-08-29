'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Must stay a single motion component across both branches. Swapping to a
 * plain <div> when reduced motion resolves lets React reuse the same DOM
 * node, keeping the server-rendered opacity:0 forever.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={reduce ? undefined : { once: true, amount: 0.2 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
