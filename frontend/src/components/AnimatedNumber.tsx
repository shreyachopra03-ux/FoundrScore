import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

interface Props {
    value: number;
    duration?: number;
    className?: string;
}

/** Counts up to `value` once it scrolls into view. Renders the final value directly under reduced motion. */
export default function AnimatedNumber({ value, duration = 1.2, className }: Props) {
    // Preserve the precision of the real value (e.g. a 4.5 month runway) instead of rounding it away.
    const decimals = Number.isInteger(value) ? 0 : Math.min((String(value).split(".")[1] ?? "").length, 2);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (reduceMotion || !inView) return;
        const controls = animate(0, value, {
            duration,
            ease: EASE,
            onUpdate: (v) => setDisplay(Number(v.toFixed(decimals))),
        });
        return () => controls.stop();
    }, [inView, value, duration, reduceMotion, decimals]);

    return (
        <span ref={ref} className={className}>
            {(reduceMotion ? value : display).toFixed(decimals)}
        </span>
    );
}
