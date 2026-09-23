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
        <div className="w-full max-w-xl rounded-2xl bg-lavender p-6 text-lavender-foreground shadow-xl shadow-black/10 sm:p-7">
            <span className="font-mono text-xs font-semibold tracking-wider text-lavender-foreground/70 uppercase">
                Venture Viability Engine
            </span>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-lavender-foreground">
                Tell us what you're building
            </h2>
            <p className="mt-1 text-sm text-lavender-foreground/70">
                The more specific you are, the more useful the score.
            </p>

            <form onSubmit={submitHandler} className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="idea" className="font-mono text-xs font-medium tracking-wide text-lavender-foreground/80 uppercase">
                        Startup idea
                    </Label>
                    <Textarea
                        id="idea"
                        placeholder="I'm building a marketplace that helps independent chefs sell weekly meal kits to busy parents..."
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        rows={3}
                        maxLength={300}
                        className="rounded-lg border-transparent bg-white py-2.5 text-neutral-800 placeholder:text-neutral-400 focus-visible:ring-primary/40"
                    />
                    <span className="self-end font-mono text-xs text-lavender-foreground/60">{idea.length}/300</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="budget" className="font-mono text-xs font-medium tracking-wide text-lavender-foreground/80 uppercase">
                            Budget (optional)
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
                            className="h-10 rounded-lg border-transparent bg-white text-neutral-800 placeholder:text-neutral-400 focus-visible:ring-primary/40"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="industry" className="font-mono text-xs font-medium tracking-wide text-lavender-foreground/80 uppercase">
                            Industry (optional)
                        </Label>
                        <Select value={industry} onValueChange={(value) => setIndustry(value ?? "")}>
                            <SelectTrigger
                                id="industry"
                                className="h-10 w-full rounded-lg border-transparent bg-white text-neutral-800"
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

                <div className="flex items-center gap-1.5 font-mono text-xs text-lavender-foreground/70 tracking-wide uppercase">
                    <Lock className="size-3" />
                    Your inputs stay private.
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full gap-2 rounded-lg cursor-pointer"
                    size="lg"
                    variant="gradient"
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            Score my idea
                            <ArrowRight className="size-4" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
};

export default IdeaInputForm;
