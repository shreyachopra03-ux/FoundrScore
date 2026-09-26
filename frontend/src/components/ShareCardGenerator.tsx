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
        <section className="w-full border-t border-line py-20 sm:py-28">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
                <Reveal className="flex flex-col items-start gap-4 lg:items-center lg:text-center">
                    <span className="label-mono text-cyan">Shareable verdict</span>
                    <h2 className="display max-w-4xl text-5xl text-ivory sm:text-7xl lg:text-8xl">
                        Your idea, in one <em className="text-amber">honest</em> line.
                    </h2>
                    <p className="max-w-md text-base text-ivory/60">
                        Send this to a co-founder, mentor, or group chat. Context optional.
                    </p>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
                    {/* The card itself — this node is what gets exported as PNG */}
                    <motion.div
                        initial={{ opacity: 0, y: 32, rotate: -1.5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                        whileHover={{ y: -4 }}
                        className="lg:col-span-7"
                    >
                        <div
                            ref={cardRef}
                            className="relative overflow-hidden rounded-3xl border border-cyan/25 bg-ink p-7 text-ivory shadow-[0_40px_120px_-30px_rgb(94_228_234/0.35)] sm:p-10"
                            style={{
                                backgroundImage:
                                    "radial-gradient(ellipse 70% 60% at 100% 0%, rgb(94 228 234 / 0.20), transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, rgb(242 193 78 / 0.12), transparent 60%), linear-gradient(rgb(243 238 227 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(243 238 227 / 0.05) 1px, transparent 1px)",
                                backgroundSize: "auto, auto, 40px 40px, 40px 40px",
                            }}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-heading text-2xl text-ivory">FoundrScore</span>
                                <span className="shrink-0 whitespace-nowrap rounded-full border border-ivory/20 px-3 py-1 label-mono text-[10px] text-ivory/70">
                                    FoundrScore verdict
                                </span>
                            </div>

                            <div className="mt-10 flex items-end gap-2 sm:mt-14">
                                <span className="display text-[7.5rem] leading-[0.8] tabular-nums sm:text-[10rem]">
                                    {result.founderScore}
                                </span>
                                <span className="mb-2 font-mono text-lg text-ivory/45">/100</span>
                            </div>

                            <div className="mt-6 h-px w-full bg-ivory/15">
                                <div className="h-px bg-cyan" style={{ width: `${result.founderScore}%` }} />
                            </div>

                            <p className="mt-7 font-heading text-3xl leading-[1.15] text-balance sm:text-4xl">
                                {result.shareSummary}
                            </p>

                            <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-ivory/10 pt-4 label-mono text-ivory/55">
                                <span>Scored just now &middot; {result.verdict}</span>
                                <span className="text-cyan/80">foundrscore</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-5">
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleCopy}
                                variant="ivory"
                                className="h-14 w-full justify-between rounded-md px-6 text-base font-medium cursor-pointer"
                            >
                                {copied ? "Copied" : "Copy verdict text"}
                                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                            </Button>
                            <Button
                                onClick={handleDownload}
                                disabled={downloading}
                                variant="line"
                                className="h-14 w-full justify-between rounded-md px-6 text-base font-medium cursor-pointer"
                            >
                                {downloading ? "Preparing..." : "Download card"}
                                {downloading ? <Spinner /> : <Download className="size-4" />}
                            </Button>
                            {onReset && (
                                <button
                                    onClick={onReset}
                                    className="group mt-1 flex items-center gap-2 self-start label-mono text-ivory/55 transition-colors hover:text-cyan cursor-pointer"
                                >
                                    <RotateCcw className="size-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                                    Score another idea
                                </button>
                            )}
                        </div>

                        <p className="label-mono leading-relaxed text-ivory/40">
                            Nothing is saved &mdash; this card is generated in your browser only.
                        </p>

                        <div className="rounded-xl border border-line bg-ink-2 p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="label-mono text-amber">The 10-second version</p>
                                    <p className="mt-2 font-heading text-xl leading-snug text-ivory italic">
                                        &ldquo;{result.shareSummary}&rdquo;
                                    </p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    aria-label="Copy verdict text"
                                    className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ivory/70 transition-colors hover:border-cyan hover:text-cyan cursor-pointer"
                                >
                                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
};

export default SharedCardGenerator;
