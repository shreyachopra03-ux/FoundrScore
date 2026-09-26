import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Minus, Plus } from "lucide-react";
import { type AnalyzeResponse } from "../types/index";
import AnimatedNumber from "./AnimatedNumber";
import { RevealStagger } from "./Reveal";
import Reveal from "./Reveal";
import { EASE, revealItemVariants } from "../lib/motion";

const VERDICT_STYLES: Record<AnalyzeResponse["verdict"], { chip: string; dot: string }> = {
    "Strong - build it": {
        chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
        dot: "bg-emerald-400",
    },
    "Promising, needs refinement": {
        chip: "border-amber/35 bg-amber/10 text-amber",
        dot: "bg-amber",
    },
    "Weak - needs a pivot": {
        chip: "border-ember/35 bg-ember/10 text-[#ff9a6e]",
        dot: "bg-ember",
    },
    "Oversaturated / declining category": {
        chip: "border-red-400/35 bg-red-400/10 text-red-300",
        dot: "bg-red-400",
    },
};

const METRIC_LABELS: Record<keyof AnalyzeResponse["scoreBreakdown"], string> = {
    marketDemand: "Market demand",
    differentiation: "Differentiation",
    feasibility: "Feasibility",
    timing: "Timing",
    monetizationClarity: "Monetization",
};

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Section wrapper keeping the editorial column system consistent. */
function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export const ResultsDashboard = ({ result }: { result: AnalyzeResponse }) => {
    const metrics = (
        Object.keys(result.scoreBreakdown) as Array<keyof AnalyzeResponse["scoreBreakdown"]>
    ).map((key) => ({
        label: METRIC_LABELS[key],
        value: result.scoreBreakdown[key],
    }));

    const verdictStyle = VERDICT_STYLES[result.verdict];

    return (
        <div id="results" className="w-full scroll-mt-24">
            {/* ─────────────────────────── 1. SCORE HERO ─────────────────────────── */}
            <Container>
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="relative overflow-hidden rounded-3xl border border-line bg-ink-2"
                >
                    <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-50 mask-[radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
                    <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan/15 blur-[120px]" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-12">
                        {/* Score */}
                        <div className="flex flex-col p-6 sm:p-10 lg:col-span-7 lg:p-14">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="label-mono text-cyan">FoundrScore analysis</span>
                                <span className="h-px w-8 bg-line" />
                                <span className="label-mono text-ivory/45">Scored just now</span>
                            </div>

                            <div className="mt-6 flex items-end gap-3 sm:mt-8">
                                <AnimatedNumber
                                    value={result.founderScore}
                                    duration={1.4}
                                    className="display text-[8.5rem] leading-[0.78] tabular-nums text-ivory sm:text-[12rem] lg:text-[15rem]"
                                />
                                <span className="mb-2 font-mono text-lg text-ivory/40 sm:mb-4 sm:text-2xl">/100</span>
                            </div>

                            {/* 0–100 scale with marker */}
                            <div className="mt-8 max-w-lg">
                                <div className="relative h-px w-full bg-ivory/15">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-cyan"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.founderScore}%` }}
                                        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
                                    />
                                    <motion.span
                                        className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_var(--cyan)]"
                                        initial={{ left: "0%" }}
                                        animate={{ left: `${result.founderScore}%` }}
                                        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
                                    />
                                </div>
                                <div className="mt-2 flex justify-between font-mono text-[10px] text-ivory/35">
                                    <span>0</span>
                                    <span>25</span>
                                    <span>50</span>
                                    <span>75</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 label-mono ${verdictStyle.chip}`}
                                >
                                    <span className={`size-1.5 rounded-full ${verdictStyle.dot}`} />
                                    {result.verdict}
                                </span>
                                {result.budgetAnalysis && (
                                    <span className="inline-flex items-center rounded-full border border-line px-3.5 py-1.5 label-mono text-ivory/60">
                                        Budget provided
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Summary & timing */}
                        <div className="flex flex-col justify-between gap-10 border-t border-line p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-12">
                            <div>
                                <span className="label-mono text-ivory/45">Submitted idea</span>
                                <p className="mt-4 font-heading text-3xl leading-[1.15] text-balance text-ivory sm:text-4xl">
                                    &ldquo;{result.shareSummary}&rdquo;
                                </p>
                            </div>

                            <div className="border-t border-line pt-6">
                                <span className="label-mono text-cyan/80">Market timing</span>
                                <p className="mt-3 text-sm leading-relaxed text-ivory/70 sm:text-base">
                                    {result.marketTimingAnalysis}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* In-report navigation */}
                    <div className="relative flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-4 label-mono text-ivory/50 sm:px-10 lg:px-14">
                        <button onClick={() => scrollToId("dimensions")} className="inline-flex items-center gap-1.5 hover:text-ivory cursor-pointer">
                            <ArrowDown className="size-3" /> 5 dimensions
                        </button>
                        <button onClick={() => scrollToId("competitors")} className="inline-flex items-center gap-1.5 hover:text-ivory cursor-pointer">
                            <ArrowDown className="size-3" /> Real competitors
                        </button>
                        {result.budgetAnalysis && (
                            <button onClick={() => scrollToId("budget")} className="inline-flex items-center gap-1.5 hover:text-ivory cursor-pointer">
                                <ArrowDown className="size-3" /> Budget fit
                            </button>
                        )}
                    </div>
                </motion.section>
            </Container>

            {/* ─────────────────────────── 2. FIVE DIMENSIONS (ivory band) ─────────────────────────── */}
            <section id="dimensions" className="mt-20 scroll-mt-20 bg-ivory text-ink sm:mt-28">
                <Container className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-10">
                    <Reveal className="lg:col-span-4">
                        <span className="label-mono text-ink/55">Analysis Breakdown</span>
                        <h2 className="display mt-4 text-5xl text-ink sm:text-6xl">
                            The 5 <em>Dimensions</em>
                        </h2>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/60">
                            Each dimension is scored independently from 0 to 100.
                        </p>
                    </Reveal>

                    <RevealStagger className="lg:col-span-8" staggerDelay={0.07}>
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                variants={revealItemVariants}
                                className="group grid grid-cols-[auto_1fr_auto] items-end gap-x-4 border-t border-ink/15 py-5 last:border-b sm:gap-x-8 sm:py-6"
                            >
                                <span className="self-start pt-1 font-mono text-xs text-ink/40">{pad(i + 1)}</span>

                                <div className="flex min-w-0 flex-col gap-3">
                                    <span className="label-mono text-ink/80">{metric.label}</span>
                                    <div className="relative h-1.5 w-full bg-ink/10">
                                        {[25, 50, 75].map((t) => (
                                            <span key={t} className="absolute top-0 h-full w-px bg-ivory" style={{ left: `${t}%` }} />
                                        ))}
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-ink"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${metric.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: EASE }}
                                        />
                                    </div>
                                </div>

                                <AnimatedNumber
                                    value={metric.value}
                                    className="display min-w-[2ch] text-right text-5xl tabular-nums text-ink sm:text-7xl"
                                />
                            </motion.div>
                        ))}
                    </RevealStagger>
                </Container>
            </section>

            {/* ─────────────────────────── 3. CRITICAL FEEDBACK ─────────────────────────── */}
            <section className="py-20 sm:py-28">
                <Container>
                    <Reveal className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <span className="label-mono text-ember">Critical Feedback</span>
                            <h2 className="display mt-4 max-w-3xl text-5xl text-ivory sm:text-7xl">
                                What would change <em className="text-cyan">our mind?</em>
                            </h2>
                        </div>
                        <button
                            onClick={() => scrollToId("competitors")}
                            className="group inline-flex shrink-0 items-center gap-2 self-start label-mono text-ivory/60 transition-colors hover:text-cyan lg:self-end cursor-pointer"
                        >
                            View competitors &amp; budget fit
                            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </Reveal>

                    <RevealStagger className="grid grid-cols-1 md:grid-cols-3" staggerDelay={0.1}>
                        {result.improvements.slice(0, 3).map((item, index) => (
                            <motion.article
                                key={index}
                                variants={revealItemVariants}
                                className="group relative flex flex-col gap-5 border-b border-line py-10 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 md:not-first:border-l"
                            >
                                <span className="display text-[5.5rem] leading-none text-transparent [-webkit-text-stroke:1px_var(--cyan)] transition-colors duration-500 group-hover:text-cyan/15">
                                    {pad(index + 1)}
                                </span>
                                <h3 className="font-heading text-3xl leading-tight text-ivory">{item.issue}</h3>
                                <div className="mt-auto flex gap-3 border-t border-line pt-5">
                                    <span className="label-mono mt-1 shrink-0 text-cyan/80">Fix</span>
                                    <p className="text-sm leading-relaxed text-ivory/65">{item.fix}</p>
                                </div>
                            </motion.article>
                        ))}
                    </RevealStagger>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 label-mono text-ivory/45">
                        <button onClick={() => scrollToId("competitors")} className="hover:text-ivory cursor-pointer">
                            Real competitors
                        </button>
                        {result.budgetAnalysis && (
                            <button onClick={() => scrollToId("budget")} className="hover:text-ivory cursor-pointer">
                                Budget fit
                            </button>
                        )}
                        <span>5 dimensions</span>
                    </div>
                </Container>
            </section>

            {/* ─────────────────────────── 4. COMPETITIVE RADAR ─────────────────────────── */}
            <section id="competitors" className="scroll-mt-20 border-t border-line bg-ink-2/60 py-20 sm:py-28">
                <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                    <Reveal className="lg:col-span-4">
                        <span className="label-mono text-ivory/50">Competitive Radar</span>
                        <h2 className="display mt-4 text-5xl text-ivory sm:text-6xl">
                            Who&rsquo;s already <em className="text-cyan">doing this</em>
                        </h2>
                        <p className="mt-6 inline-flex items-center gap-2 label-mono text-ivory/45">
                            <span className="size-1.5 rounded-full bg-ember" />
                            {pad(result.competitorLandscape.length)} players identified
                        </p>
                    </Reveal>

                    <RevealStagger className="lg:col-span-8" staggerDelay={0.08}>
                        {result.competitorLandscape.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={revealItemVariants}
                                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-line py-7 last:border-b sm:gap-8 sm:py-9"
                            >
                                <span className="font-mono text-xs text-ivory/40">C/{pad(index + 1)}</span>
                                <span className="display min-w-0 text-4xl break-words text-ivory transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
                                    {item}
                                </span>
                                <ArrowUpRight className="size-6 text-ivory/25 transition-all duration-500 group-hover:text-cyan sm:size-8" />
                            </motion.div>
                        ))}
                    </RevealStagger>
                </Container>
            </section>

            {/* ─────────────────────────── 5. CAPITAL EFFICIENCY (amber band) ─────────────────────────── */}
            {result.budgetAnalysis && (
                <section id="budget" className="scroll-mt-20 bg-amber text-ink">
                    <Container className="py-16 sm:py-24">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                            <Reveal className="lg:col-span-7">
                                <span className="label-mono text-ink/60">Capital Efficiency</span>
                                <h2 className="display mt-4 text-5xl text-ink sm:text-7xl">What your budget buys</h2>
                                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                                    {result.budgetAnalysis.verdict}
                                </p>
                            </Reveal>

                            <Reveal delay={0.1} className="lg:col-span-5">
                                <div className="rounded-2xl bg-ink p-7 text-ivory sm:p-9">
                                    <span className="label-mono text-amber">Estimated runway</span>
                                    <div className="mt-4 flex items-end gap-3">
                                        <AnimatedNumber
                                            value={result.budgetAnalysis.runwayEstimateMonths}
                                            className="display text-[7rem] leading-[0.8] tabular-nums sm:text-[9rem]"
                                        />
                                        <span className="mb-2 font-heading text-3xl italic text-ivory/70">months</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="mt-14 grid grid-cols-1 border-t border-ink/20 md:grid-cols-2">
                            <Reveal className="py-8 md:pr-10">
                                <p className="label-mono text-ink">What you can build</p>
                                <ul className="mt-5">
                                    {result.budgetAnalysis.whatYouCanBuild.map((item, index) => (
                                        <li key={index} className="flex gap-4 border-b border-ink/15 py-3.5 text-base text-ink/85">
                                            <Plus className="mt-1 size-4 shrink-0 text-ink" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                            <Reveal delay={0.08} className="border-t border-ink/20 py-8 md:border-t-0 md:border-l md:pl-10">
                                <p className="label-mono text-ink">What you can&rsquo;t afford</p>
                                <ul className="mt-5">
                                    {result.budgetAnalysis.whatYouCannotAfford.map((item, index) => (
                                        <li key={index} className="flex gap-4 border-b border-ink/15 py-3.5 text-base text-ink/60">
                                            <Minus className="mt-1 size-4 shrink-0 text-ink/60" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>

                        <Reveal className="mt-6 border-t border-ink/20 pt-8">
                            <span className="label-mono text-ink/60">Recommendation</span>
                            <p className="mt-3 max-w-4xl font-heading text-2xl leading-snug text-ink italic sm:text-3xl">
                                {result.budgetAnalysis.recommendation}
                            </p>
                        </Reveal>
                    </Container>
                </section>
            )}
        </div>
    );
};
