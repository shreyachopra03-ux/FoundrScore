import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../lib/motion";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
    y?: number;
}

export default function Reveal({ children, delay = 0, className, y = 24 }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function RevealStagger({
    children,
    className,
    staggerDelay = 0.08,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: staggerDelay } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
