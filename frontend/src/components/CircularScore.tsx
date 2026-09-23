import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface Props {
    score: number;
    size?: number;
}

export default function CircularScore({ score, size = 120 }: Props) {
    const stroke = 10;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const [displayScore, setDisplayScore] = useState(0);
    const progress = useMotionValue(0);
    const offset = useTransform(progress, (v) => circumference - (v / 100) * circumference);

    useEffect(() => {
        const controls = animate(progress, score, {
            duration: 1.1,
            ease: [0.21, 0.47, 0.32, 0.98],
            onUpdate: (v) => setDisplayScore(Math.round(v)),
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={stroke}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl font-bold text-foreground">{displayScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
            </div>
        </div>
    );
}
