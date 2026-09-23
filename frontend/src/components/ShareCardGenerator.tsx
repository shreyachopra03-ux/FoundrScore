import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { type AnalyzeResponse } from "../types/index";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import Reveal from "./Reveal";

const SharedCardGenerator = ({
    result,
    onReset,
}: {
    result: AnalyzeResponse;
    onReset?: () => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);
    const [copied, setCopied] = useState(false);

    async function handleDownload() {
        if (!cardRef.current) return;

        setDownloading(true);
        try {
            const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
            const link = document.createElement("a");
            link.download = "foundrscore-verdict.png";
            link.href = dataUrl;
            link.click();
        } finally {
            setDownloading(false);
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(result.shareSummary);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    return (
        <div className="mt-10 flex w-full max-w-xl flex-col items-center gap-6">
            <Reveal className="flex flex-col items-center gap-2 text-center">
                <span className="rounded-full bg-foreground/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-foreground/70 uppercase">
                    Shareable verdict
                </span>
                <h3 className="font-heading text-2xl font-bold">Your idea, in one honest line.</h3>
                <p className="text-sm text-muted-foreground">
                    Send this to a co-founder, mentor, or group chat. Context optional.
                </p>
            </Reveal>

            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 24, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full rounded-2xl bg-verdict p-7 text-verdict-foreground shadow-xl"
            >
                <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-bold tracking-tight">FoundrScore</span>
                    <span className="rounded-full border border-white/20 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-white/70 uppercase">
                        FoundrScore verdict
                    </span>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-heading text-6xl font-bold">{result.founderScore}</span>
                    <span className="font-mono text-lg text-white/50">/100</span>
                </div>

                <p className="mt-3 text-balance text-lg font-medium">{result.shareSummary}</p>

                <div className="mt-5 border-t border-white/10 pt-3 font-mono text-xs text-white/60 tracking-wider uppercase">
                    Scored just now &middot; {result.verdict}
                </div>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Button onClick={handleCopy} variant="gradient" className="gap-2 cursor-pointer">
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Copied" : "Copy verdict text"}
                </Button>
                <Button onClick={handleDownload} disabled={downloading} variant="outline" className="gap-2 border-border bg-card text-foreground hover:bg-secondary cursor-pointer">
                    {downloading ? <Spinner /> : <Download className="size-4" />}
                    {downloading ? "Preparing..." : "Download card"}
                </Button>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <RotateCcw className="size-3.5" />
                        Score another idea
                    </button>
                )}
            </div>

            <p className="text-center font-mono text-xs tracking-wide text-muted-foreground">
                Nothing is saved &mdash; this card is generated in your browser only.
            </p>

            <div className="w-full rounded-2xl bg-lavender p-5 text-lavender-foreground">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="font-mono text-xs font-semibold tracking-wider text-lavender-foreground/70 uppercase">
                            The 10-second version
                        </p>
                        <p className="mt-1 text-sm font-medium">&ldquo;{result.shareSummary}&rdquo;</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70 text-lavender-foreground transition-colors hover:bg-white"
                    >
                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SharedCardGenerator;
