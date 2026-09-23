import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const TONES = {
    mint: { bg: "var(--block-mint)", grid: "var(--block-mint-grid)" },
    peach: { bg: "var(--block-peach)", grid: "var(--block-peach-grid)" },
    sky: { bg: "var(--block-sky)", grid: "var(--block-sky-grid)" },
} as const;

export function DimensionsIllustration() {
    return (
        <svg viewBox="0 0 240 130" className="h-32 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Back card */}
            <rect x="92" y="16" width="94" height="74" rx="2" stroke="#15803d" strokeWidth="2" fill="#ffffff" />
            {/* Avatar box in back card */}
            <rect x="146" y="24" width="30" height="28" rx="2" stroke="#15803d" strokeWidth="1.5" fill="#f0fdf4" />
            <circle cx="161" cy="33" r="4.5" stroke="#15803d" strokeWidth="1.5" />
            <path d="M153 47c0-3.5 3.5-5.5 8-5.5s8 2 8 5.5" stroke="#15803d" strokeWidth="1.5" />
            {/* Back card lines */}
            <line x1="100" y1="28" x2="136" y2="28" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="100" y1="38" x2="134" y2="38" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="100" y1="46" x2="130" y2="46" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="100" y1="54" x2="122" y2="54" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

            {/* Front card */}
            <rect x="52" y="22" width="88" height="74" rx="2" stroke="#14532d" strokeWidth="2.2" fill="#ffffff" />
            <line x1="60" y1="32" x2="130" y2="32" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="44" x2="124" y2="44" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="54" x2="116" y2="54" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="64" x2="126" y2="64" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="60" y1="74" x2="102" y2="74" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

            {/* Bottom mini card */}
            <rect x="86" y="84" width="60" height="28" rx="2" stroke="#14532d" strokeWidth="2" fill="#ffffff" />
            <line x1="94" y1="94" x2="136" y2="94" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            <line x1="94" y1="102" x2="124" y2="102" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

            {/* Top Left Cursor */}
            <path d="M40 32l16 4-6 4 4 7-3 2-4-7-5 5v-15z" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Bottom Right Cursor */}
            <path d="M142 98l16 4-6 4 4 7-3 2-4-7-5 5v-15z" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Decorative stars / sparkles */}
            <path d="M198 60l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" stroke="#15803d" strokeWidth="1.5" fill="none" />
            <path d="M74 104l3 2 1 3 2-3 3-1-3-2-1-3-2 3-3 1z" stroke="#15803d" strokeWidth="1.5" fill="none" />
            <rect x="110" y="8" width="6" height="6" stroke="#15803d" strokeWidth="1.5" fill="none" />
            <path d="M62 98l4 4m0-4l-4 4" stroke="#15803d" strokeWidth="1.5" />
        </svg>
    );
}

export function CompetitorsIllustration() {
    return (
        <svg viewBox="0 0 240 130" className="h-32 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top-left node */}
            <rect x="36" y="32" width="86" height="48" rx="3" stroke="#9a3412" strokeWidth="2.2" fill="#ffffff" />
            {/* Circle / Avatar */}
            <circle cx="52" cy="46" r="5" fill="#ea580c" />
            <line x1="64" y1="44" x2="108" y2="44" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
            <line x1="64" y1="52" x2="98" y2="52" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />

            {/* Connecting right-angle path */}
            <path d="M122 56h48v30" stroke="#9a3412" strokeWidth="2" strokeLinejoin="round" />
            {/* Arrowheads along path */}
            <polygon points="144,52 153,56 144,60" fill="#9a3412" />
            <polygon points="170,88 166,80 174,80" fill="#9a3412" />

            {/* Branch connectors */}
            <path d="M82 80v16" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
            <path d="M112 80v16h20" stroke="#9a3412" strokeWidth="2" strokeLinejoin="round" />

            {/* Bottom-right node */}
            <rect x="136" y="78" width="86" height="42" rx="3" stroke="#9a3412" strokeWidth="2.2" fill="#ffffff" />
            <line x1="146" y1="92" x2="202" y2="92" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
            <line x1="146" y1="102" x2="190" y2="102" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />

            {/* Solid downward coral triangle */}
            <polygon points="70,96 96,96 83,122" fill="#ea580c" />
        </svg>
    );
}

export function NextStepsIllustration() {
    return (
        <svg viewBox="0 0 240 130" className="h-32 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Central orbital rings */}
            <g stroke="#0f172a" strokeWidth="2.2" fill="none">
                <ellipse cx="120" cy="65" rx="64" ry="24" transform="rotate(-6 120 65)" />
                <ellipse cx="120" cy="65" rx="55" ry="22" transform="rotate(-58 120 65)" />
                <ellipse cx="120" cy="65" rx="58" ry="22" transform="rotate(52 120 65)" />
            </g>

            {/* Nucleus / Eye core */}
            <circle cx="120" cy="65" r="9" stroke="#0f172a" strokeWidth="2" fill="#ffffff" />
            <circle cx="120" cy="65" r="4.5" fill="#1d4ed8" />

            {/* Geometric accents matching Jasper reference */}
            <polygon points="192,50 207,58 192,66" fill="#1d4ed8" />
            <circle cx="68" cy="80" r="3.5" fill="#1d4ed8" />
            <polygon points="56,76 64,88 50,88" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            <rect x="175" y="88" width="10" height="10" fill="#1e3a8a" transform="rotate(12 180 93)" />
            <path d="M85 35v10m-5-5h10m-8-3l7 7m0-7l-7 7" stroke="#0f172a" strokeWidth="1.5" />
            <polygon points="210,38 215,44 210,50 205,44" fill="#0f172a" />
        </svg>
    );
}

interface Props {
    tone: keyof typeof TONES;
    children?: ReactNode;
    className?: string;
    size?: "chip" | "block";
    title?: string;
    description?: string;
    onAction?: () => void;
    href?: string;
    illustration?: ReactNode;
}

export default function GridPaperPanel({
    tone,
    children,
    className = "",
    size = "chip",
    title,
    description,
    onAction,
    href,
    illustration,
}: Props) {
    const { bg, grid } = TONES[tone];
    const isBlock = size === "block";

    // Default matching illustration if not explicitly provided
    const defaultIllustration =
        illustration ||
        (tone === "mint" ? (
            <DimensionsIllustration />
        ) : tone === "peach" ? (
            <CompetitorsIllustration />
        ) : (
            <NextStepsIllustration />
        ));

    if (!isBlock) {
        return (
            <div
                className={`relative overflow-hidden rounded-xl p-5 ${className}`}
                style={{
                    backgroundColor: bg,
                    backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                }}
            >
                {children}
            </div>
        );
    }

    const cardContent = (
        <div
            className={`group relative flex flex-col justify-between overflow-hidden border border-black/[0.06] transition-all duration-300 hover:shadow-lg cursor-pointer ${className}`}
            style={{
                backgroundColor: bg,
            }}
        >
            {/* Top Heading */}
            <div className="p-6 sm:p-7 pb-3">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0c1527]">
                    {title}
                </h3>
            </div>

            {/* Middle Grid Canvas with Custom Illustration */}
            <div
                className="relative flex h-48 sm:h-52 w-full items-center justify-center overflow-hidden border-y border-black/[0.04]"
                style={{
                    backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                }}
            >
                {defaultIllustration}
            </div>

            {/* Bottom Description & Arrow */}
            <div className="flex items-end justify-between gap-4 p-6 sm:p-7 pt-4">
                <p className="text-xs sm:text-sm font-normal text-[#0f172a]/85 leading-snug max-w-[85%]">
                    {description}
                </p>
                <ArrowRight className="size-5 shrink-0 text-[#0c1527] transition-transform duration-200 group-hover:translate-x-1.5" />
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block h-full text-inherit no-underline">
                {cardContent}
            </a>
        );
    }

    if (onAction) {
        return (
            <button type="button" onClick={onAction} className="block w-full text-left h-full">
                {cardContent}
            </button>
        );
    }

    return cardContent;
}
