import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import IdeaInputForm from "../components/IdeaInputForm";
import AnalysisLoader from "../components/AnalysisLoader";
import { type AnalyzeResponse } from "../types/index";
import { useRouter } from "../lib/router";

interface Props {
    onResult: (result: AnalyzeResponse) => void;
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export default function ValidatePage({ onResult, loading, setLoading }: Props) {
    const { navigate } = useRouter();

    const handleResult = (result: AnalyzeResponse) => {
        onResult(result);
        navigate("/results");
    };

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 pt-10 pb-24 sm:pt-16">
            {/* Header controls & breadcrumb */}
            <div className="flex w-full items-center justify-between">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </button>

                <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Step 01 &middot; Idea Assessment
                </span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col items-center gap-3 text-center"
            >
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Submit your startup hypothesis
                </h1>
                <p className="max-w-md text-balance text-sm text-foreground/75">
                    Provide your core thesis, target user, and available capital for an unvarnished evaluation.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full"
            >
                <IdeaInputForm onResult={handleResult} loading={loading} setLoading={setLoading} />
            </motion.div>

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="w-full"
                    >
                        <AnalysisLoader />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
