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
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 px-4 pt-20 pb-32 text-center">
                <div className="rounded-3xl border border-border bg-card p-10 shadow-sm flex flex-col items-center gap-4">
                    <span className="rounded-full bg-foreground/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        No Report Available
                    </span>
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                        You haven't scored an idea yet
                    </h2>
                    <p className="max-w-md text-sm text-foreground/75 leading-relaxed">
                        Submit your startup idea and optional budget parameters to generate your comprehensive Founder Score breakdown.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                        <Button
                            variant="gradient"
                            size="lg"
                            onClick={() => navigate("/validate")}
                            className="gap-2 cursor-pointer font-semibold shadow-sm"
                        >
                            <Sparkles className="size-4" />
                            Score my idea now
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate("/")}
                            className="cursor-pointer border-border bg-card text-foreground hover:bg-secondary"
                        >
                            Return to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-4 pt-10 pb-28 sm:pt-14">
            {/* Top Navigation & Controls */}
            <div className="flex w-full items-center justify-between border-b border-border/60 pb-4">
                <button
                    type="button"
                    onClick={() => navigate("/validate")}
                    className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to Idea Input
                </button>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleScoreAnother}
                        className="gap-1.5 font-mono text-xs font-semibold tracking-wider uppercase border-border bg-card text-foreground hover:bg-secondary cursor-pointer"
                    >
                        <RotateCcw className="size-3.5" />
                        Score Another
                    </Button>
                </div>
            </div>

            {/* Title & Metadata Banner */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col items-center gap-2 text-center"
            >
                <span className="rounded-full bg-primary/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-primary uppercase">
                    Official Venture Assessment
                </span>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Founder Score Report
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                    Data-informed critique calibrated against current 2026 venture standards.
                </p>
            </motion.div>

            {/* Results Dashboard Card */}
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full"
            >
                <ResultsDashboard result={result} />
            </motion.div>

            {/* Share Card Generator */}
            <SharedCardGenerator result={result} onReset={handleScoreAnother} />
        </div>
    );
}
