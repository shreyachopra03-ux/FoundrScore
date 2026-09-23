import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-neutral-50">
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />
            <div
                className="absolute inset-x-0 top-0 h-[28rem] opacity-70"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)",
                }}
            />

            <div className="relative">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
                    <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                            F
                        </span>
                        <span className="text-base font-semibold tracking-tight text-neutral-900">
                            FoundrScore
                        </span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                        >
                            How it works
                        </a>
                        <a
                            href="#product"
                            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                        >
                            See Product
                        </a>
                    </div>

                    <button
                        type="button"
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                    >
                        Validate Idea
                    </button>
                </nav>

                <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-12 pb-16 text-center sm:px-8 sm:pt-20 sm:pb-24">
                    <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-neutral-900 sm:text-5xl md:text-6xl">
                        Validate your <span className="text-blue-600">Startup Idea</span>{" "}
                        before you Build
                    </h1>

                    <p className="mt-5 max-w-xl text-balance text-base text-neutral-500 sm:text-lg">
                        Get instant, AI-powered feedback on your startup idea &mdash; market
                        demand, differentiation, timing, and monetization, scored honestly
                        in seconds.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 sm:w-auto"
                        >
                            Score My Idea
                            <ArrowRight className="size-4" />
                        </button>
                        <button
                            type="button"
                            className="w-full rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 sm:w-auto"
                        >
                            See how it works
                        </button>
                    </div>

                    <div className="mt-16 w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-xl shadow-neutral-900/5 sm:p-8">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                            <span className="text-sm font-medium text-neutral-400">
                                Results preview
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                                <CheckCircle2 className="size-3.5" />
                                Strong &ndash; build it
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-2 py-6 sm:flex-row sm:justify-between sm:text-left">
                            <div>
                                <p className="text-sm text-neutral-400">FoundrScore</p>
                                <p className="text-5xl font-extrabold tracking-tight text-neutral-900">
                                    84
                                    <span className="text-lg font-medium text-neutral-400">
                                        /100
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                                <TrendingUp className="size-4" />
                                Timing is favorable
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5 sm:grid-cols-4">
                            {[
                                { label: "Demand", value: 88 },
                                { label: "Differentiation", value: 71 },
                                { label: "Feasibility", value: 80 },
                                { label: "Timing", value: 92 },
                            ].map((metric) => (
                                <div key={metric.label} className="flex flex-col gap-1.5">
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                        <div
                                            className="h-full rounded-full bg-blue-600"
                                            style={{ width: `${metric.value}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-500">
                                        {metric.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
