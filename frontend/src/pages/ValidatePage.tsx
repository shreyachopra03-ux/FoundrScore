import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import IdeaInputForm from "../components/IdeaInputForm";
import AnalysisLoader from "../components/AnalysisLoader";
import { type AnalyzeResponse } from "../types/index";
import { useRouter } from "../lib/router";
import { EASE } from "../lib/motion";

interface Props {
    onResult: (result: AnalyzeResponse) => void;
    loading: boolean;
    setLoading: (val: boolean) => void;
}

const DELIVERABLES = [
    { index: "01", label: "Founder Score", detail: "0–100, one number" },
    { index: "02", label: "Five dimensions", detail: "Demand → monetization" },
    { index: "03", label: "Competitive radar", detail: "Who's already here" },
    { index: "04", label: "Capital efficiency", detail: "What your budget buys" },
];

export default function ValidatePage({ onResult, loading, setLoading }: Props) {
    const { navigate } = useRouter();

    const handleResult = (result: AnalyzeResponse) => {
        onResult(result);
        navigate("/results");
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-24 sm:px-8 sm:pt-12 lg:pb-32">
            {/* Header controls & breadcrumb */}
            <div className="flex items-center justify-between border-b border-line pb-4">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="group inline-flex items-center gap-2 whitespace-nowrap label-mono text-ivory/55 transition-colors hover:text-ivory cursor-pointer"
                >
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </button>

                <span className="label-mono text-ivory/55">
                    Step 01 &middot; Idea Assessment
                </span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
                {/* Left: editorial message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex flex-col lg:col-span-5 lg:pt-4"
                >
                    <span className="label-mono text-cyan">Venture intake / FS-01</span>
                    <h1 className="display mt-5 text-[3.4rem] text-ivory sm:text-7xl lg:text-[5.5rem]">
                        Know what
                        <br />
                        you&rsquo;re <em className="text-cyan">building.</em>
                    </h1>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/65 sm:text-lg">
                        Submit your startup hypothesis. Provide your core thesis, target user, and available capital for an unvarnished evaluation.
                    </p>

                    {/* What the report contains */}
                    <div className="mt-10 border-t border-line lg:mt-14">
                        <p className="pt-4 label-mono text-ivory/40">What you receive</p>
                        <ul className="mt-2">
                            {DELIVERABLES.map((item) => (
                                <li
                                    key={item.index}
                                    className="flex items-baseline gap-4 border-b border-line py-3.5"
                                >
                                    <span className="font-mono text-xs text-cyan/80">{item.index}</span>
                                    <span className="font-heading text-2xl text-ivory">{item.label}</span>
                                    <span className="ml-auto hidden label-mono text-ivory/40 sm:block">
                                        {item.detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Right: the instrument */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                    className="lg:col-span-7"
                >
                    <div className="relative">
                        {/* offset frame for depth */}
                        <div
                            aria-hidden
                            className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-2xl border border-cyan/25 lg:block"
                        />
                        <div className="relative">
                            <IdeaInputForm onResult={handleResult} loading={loading} setLoading={setLoading} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="relative mt-6"
                            >
                                <AnalysisLoader />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
