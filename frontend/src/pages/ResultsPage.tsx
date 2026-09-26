import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { ResultsDashboard } from "../components/ResultsDashboard";
import SharedCardGenerator from "../components/ShareCardGenerator";
import { Button } from "../components/ui/button";
import { type AnalyzeResponse } from "../types/index";
import { useRouter } from "../lib/router";

interface Props {
    result: AnalyzeResponse | null;
    onReset: () => void;
}

export default function ResultsPage({ result, onReset }: Props) {
    const { navigate } = useRouter();

    const handleScoreAnother = () => {
        onReset();
        navigate("/validate");
    };

    if (!result) {
        return (
            <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-32 sm:px-8 sm:pt-24">
                <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 px-6 py-14 sm:px-14 sm:py-20">
                    <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-40 mask-[radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
                    <div className="relative flex max-w-2xl flex-col items-start gap-5">
                        <span className="inline-flex items-center gap-2 label-mono text-ivory/50">
                            <span className="size-1.5 rounded-full bg-ember" />
                            No Report Available
                        </span>
                        <h2 className="display text-5xl text-ivory sm:text-7xl">
                            You haven&rsquo;t scored an idea <em className="text-cyan">yet</em>
                        </h2>
                        <p className="max-w-md text-base leading-relaxed text-ivory/60">
                            Submit your startup idea and optional budget parameters to generate your comprehensive Founder Score breakdown.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Button
                                variant="ivory"
                                size="lg"
                                onClick={() => navigate("/validate")}
                                className="h-12 gap-2 px-6 text-sm font-medium cursor-pointer"
                            >
                                <Sparkles className="size-4" />
                                Score my idea now
                            </Button>
                            <Button
                                variant="line"
                                size="lg"
                                onClick={() => navigate("/")}
                                className="h-12 px-6 text-sm font-medium cursor-pointer"
                            >
                                Return to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full pt-8 sm:pt-12">
            {/* Top Navigation & Controls */}
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
                <div className="flex items-center justify-between border-b border-line pb-4">
                    <button
                        type="button"
                        onClick={() => navigate("/validate")}
                        className="group inline-flex items-center gap-2 whitespace-nowrap label-mono text-ivory/55 transition-colors hover:text-ivory cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                        Back to Idea Input
                    </button>

                    <Button
                        variant="line"
                        size="sm"
                        onClick={handleScoreAnother}
                        className="h-9 gap-1.5 px-3.5 label-mono cursor-pointer"
                    >
                        <RotateCcw className="size-3.5" />
                        Score Another
                    </Button>
                </div>

                {/* Title & Metadata Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col gap-6 py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div>
                        <span className="label-mono text-cyan">Official Venture Assessment</span>
                        <h1 className="display mt-4 text-6xl text-ivory sm:text-8xl">
                            Founder Score <em className="text-ivory/60">Report</em>
                        </h1>
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed text-ivory/55 lg:text-right">
                        Data-informed critique calibrated against current 2026 venture standards.
                    </p>
                </motion.div>
            </div>

            <ResultsDashboard result={result} />

            {/* Share Card Generator */}
            <SharedCardGenerator result={result} onReset={handleScoreAnother} />
        </div>
    );
}
