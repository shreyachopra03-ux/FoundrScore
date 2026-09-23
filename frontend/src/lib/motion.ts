import type { Variants } from "framer-motion";

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export const revealItemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
