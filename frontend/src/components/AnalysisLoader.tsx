import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

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
            className="flex flex-col items-center gap-3 py-10"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            >
                <Loader2 className="size-6 text-primary" />
            </motion.div>
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium text-foreground/70"
                >
                    {STATUS_LINES[index]}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
}
