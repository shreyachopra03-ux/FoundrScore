import { useState } from "react";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { type AnalyzeRequest, type AnalyzeResponse } from "../types/index";
import analyzeIdea from "../api/apiClient";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface Props {
    onResult : (result: AnalyzeResponse) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const INDUSTRIES = [
    "SaaS",
    "Fintech",
    "Health & Wellness",
    "E-commerce",
    "EdTech",
    "AI/ML",
    "Consumer Social",
    "Marketplace",
    "DevTools",
    "Other",
];

const IdeaInputForm = ({ onResult, loading, setLoading }: Props) => {
    const [idea, setIdea] = useState("");
    const [budgetINR, setBudgetINR] = useState<number | undefined>(undefined);
    const [industry, setIndustry] = useState("");
    const [error, setError] = useState("");

    async function submitHandler (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const input: AnalyzeRequest = { idea, budgetINR, industry };

        try {
            const result = await analyzeIdea(input);
            onResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong, Try again.");
         } finally {
            setLoading(false);
        }
        }

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-ivory text-ink shadow-2xl shadow-black/40">
            <div aria-hidden className="blueprint-ink pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent_45%)]" />

            {/* Panel header strip */}
            <div className="relative flex items-center justify-between border-b border-ink/10 px-6 py-3.5 sm:px-9">
                <span className="label-mono text-ink/60">Venture Viability Engine</span>
                <span className="label-mono text-ink/40">Form FS-01</span>
            </div>

            <div className="relative px-6 pt-7 pb-7 sm:px-9 sm:pt-9 sm:pb-9">
                <h2 className="display text-4xl text-ink sm:text-5xl">
                    Tell us what you&rsquo;re building
                </h2>
                <p className="mt-3 text-sm text-ink/60 sm:text-base">
                    The more specific you are, the more useful the score.
                </p>

                <form onSubmit={submitHandler} className="mt-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline justify-between">
                            <Label htmlFor="idea" className="label-mono text-ink/70">
                                <span className="text-ember">A.</span> Startup idea
                            </Label>
                            <span className="font-mono text-xs tabular-nums text-ink/45">{idea.length}/300</span>
                        </div>
                        <Textarea
                            id="idea"
                            placeholder="I'm building a marketplace that helps independent chefs sell weekly meal kits to busy parents..."
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            rows={3}
                            maxLength={300}
                            className="min-h-32 rounded-md border-ink/15 bg-white/70 px-4 py-3.5 font-heading text-xl leading-snug text-ink placeholder:font-sans placeholder:text-base placeholder:text-ink/35 focus-visible:border-ink focus-visible:ring-ink/10 md:text-xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="budget" className="label-mono text-ink/70">
                                <span className="text-ember">B.</span> Budget (optional)
                            </Label>
                            <Input
                                id="budget"
                                type="number"
                                min={0}
                                placeholder="e.g. ₹25,000"
                                value={budgetINR ?? ""}
                                onChange={(e) =>
                                    setBudgetINR(e.target.value === "" ? undefined : Number(e.target.value))
                                }
                                className="h-12 rounded-md border-ink/15 bg-white/70 px-4 font-mono text-ink placeholder:font-sans placeholder:text-ink/35 focus-visible:border-ink focus-visible:ring-ink/10"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="industry" className="label-mono text-ink/70">
                                <span className="text-ember">C.</span> Industry (optional)
                            </Label>
                            <Select value={industry} onValueChange={(value) => setIndustry(value ?? "")}>
                                <SelectTrigger
                                    id="industry"
                                    className="h-12 w-full rounded-md border-ink/15 bg-white/70 px-4 text-ink data-[size=default]:h-12 data-placeholder:text-ink/40 focus-visible:border-ink focus-visible:ring-ink/10 [&_svg]:text-ink/50 dark:bg-white/70 dark:hover:bg-white"
                                >
                                    <SelectValue placeholder="Select an industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INDUSTRIES.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-ink/10 pt-5 label-mono text-ink/55">
                        <Lock className="size-3" />
                        Your inputs stay private.
                    </div>

                    {error && (
                        <p role="alert" className="rounded-md border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-[#b23a0e]">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        variant="ink"
                        className="group/cta h-15 w-full justify-between gap-3 rounded-md pr-2 pl-6 text-base font-medium cursor-pointer disabled:opacity-80"
                    >
                        {loading ? (
                            <>
                                <span>Analyzing...</span>
                                <span className="flex size-11 items-center justify-center rounded-sm bg-ivory/10">
                                    <Loader2 className="size-4 animate-spin" />
                                </span>
                            </>
                        ) : (
                            <>
                                <span>Score my idea</span>
                                <span className="flex size-11 items-center justify-center rounded-sm bg-cyan text-ink transition-transform duration-300 group-hover/cta:translate-x-0.5">
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:-rotate-45" />
                                </span>
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
};

export default IdeaInputForm;
