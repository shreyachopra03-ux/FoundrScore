import { motion } from "framer-motion";
import { type AnalyzeResponse } from "../types/index";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import CircularScore from "./CircularScore";
import { RevealStagger } from "./Reveal";
import { revealItemVariants } from "../lib/motion";

const VERDICT_STYLES: Record<AnalyzeResponse["verdict"], string> = {
    "Strong - build it":
        "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20",
    "Promising, needs refinement":
        "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20",
    "Weak - needs a pivot":
        "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20",
    "Oversaturated / declining category":
        "bg-red-50 text-red-700 ring-1 ring-red-600/20",
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

export const ResultsDashboard = ({ result }: { result: AnalyzeResponse }) => {
    const metrics = (
        Object.keys(result.scoreBreakdown) as Array<keyof AnalyzeResponse["scoreBreakdown"]>
    ).map((key) => ({
        label: METRIC_LABELS[key],
        value: result.scoreBreakdown[key],
    }));

    return (
        <div id="results" className="w-full max-w-4xl scroll-mt-24">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                <div className="flex flex-col gap-4 rounded-2xl bg-lavender p-6 text-center text-lavender-foreground shadow-lg shadow-black/5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-lavender-foreground/70 uppercase">
                        Submitted idea
                    </span>
                    <p className="text-lg leading-snug font-semibold text-balance">{result.shareSummary}</p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {result.budgetAnalysis && (
                            <Badge variant="secondary" className="font-mono text-[11px] bg-white text-neutral-700 uppercase tracking-wide">
                                Budget provided
                            </Badge>
                        )}
                    </div>

                    <div className="mx-auto py-2">
                        <CircularScore score={result.founderScore} size={128} />
                    </div>

                    <Badge className={`mx-auto ${VERDICT_STYLES[result.verdict]}`} variant="outline">
                        {result.verdict}
                    </Badge>

                    <p className="text-sm text-lavender-foreground/70">{result.marketTimingAnalysis}</p>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            Analysis Breakdown
                        </span>
                        <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">The 5 Dimensions</h3>
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-col gap-1.5">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm font-medium text-foreground">{metric.label}</span>
                                    <span className="font-heading text-sm font-semibold text-primary">
                                        {metric.value}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                    <motion.div
                                        className="h-full rounded-full bg-foreground"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${metric.value}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                            Critical Feedback
                        </span>
                        <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">What would change our mind?</h3>
                    </div>
                    <button
                        onClick={() => scrollToId("competitors")}
                        className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                    >
                        View competitors & budget fit &rarr;
                    </button>
                </div>

                <RevealStagger className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {result.improvements.slice(0, 3).map((item, index) => (
                        <motion.div key={index} variants={revealItemVariants} className="flex flex-col gap-2">
                            <span className="flex size-6 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                                {index + 1}
                            </span>
                            <p className="text-sm font-semibold text-foreground">{item.issue}</p>
                            <p className="text-sm text-muted-foreground">{item.fix}</p>
                        </motion.div>
                    ))}
                </RevealStagger>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 text-xs font-mono tracking-wider uppercase text-muted-foreground">
                    <button onClick={() => scrollToId("competitors")} className="hover:text-foreground cursor-pointer">
                        Real competitors
                    </button>
                    {result.budgetAnalysis && (
                        <button onClick={() => scrollToId("budget")} className="hover:text-foreground cursor-pointer">
                            Budget fit
                        </button>
                    )}
                    <span>5 dimensions</span>
                </div>
            </div>

            <div id="competitors" className="mt-5 scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Competitive Radar
                </span>
                <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">Who's already doing this</h3>
                <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground space-y-1">
                    {result.competitorLandscape.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {result.budgetAnalysis && (
                <div id="budget" className="mt-5 scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Capital Efficiency
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">What your budget buys</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{result.budgetAnalysis.verdict}</p>

                    <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        <div>
                            <p className="font-medium">What you can build</p>
                            <ul className="mt-1 list-inside list-disc text-muted-foreground">
                                {result.budgetAnalysis.whatYouCanBuild.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium">What you can't afford</p>
                            <ul className="mt-1 list-inside list-disc text-muted-foreground">
                                {result.budgetAnalysis.whatYouCannotAfford.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Estimated runway</span>
                        <span className="text-muted-foreground">
                            {result.budgetAnalysis.runwayEstimateMonths} months
                        </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{result.budgetAnalysis.recommendation}</p>
                </div>
            )}
        </div>
    )
};
