import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_LINES = [
    "Checking who already does this...",
    "Stress-testing your numbers...",
    "Weighing timing against the market...",
    "Looking for the weak spots...",
    "Deciding if this is actually worth building...",
];

export default function AnalysisLoader() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % STATUS_LINES.length);
        }, 1600);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
            aria-live="polite"
            className="overflow-hidden rounded-xl border border-line bg-ink-2/80 backdrop-blur"
        >
            <div className="relative h-px w-full bg-line">
                <motion.div
                    className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-cyan to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="flex items-center gap-5 px-5 py-5 sm:px-6">
                <div className="flex shrink-0 items-center gap-2">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
                        <span className="relative inline-flex size-2 rounded-full bg-cyan" />
                    </span>
                    <span className="label-mono text-cyan">Analysing</span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="font-heading text-lg italic text-ivory/85 sm:text-xl"
                    >
                        {STATUS_LINES[index]}
                    </motion.p>
                </AnimatePresence>

                <span className="ml-auto hidden font-mono text-xs text-ivory/35 sm:block">
                    {String(index + 1).padStart(2, "0")}/{String(STATUS_LINES.length).padStart(2, "0")}
                </span>
            </div>
        </motion.div>
    );
}
