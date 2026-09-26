import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import Reveal, { RevealStagger } from "../components/Reveal";
import { useRouter } from "../lib/router";
import { EASE, revealItemVariants } from "../lib/motion";

const PILLARS = [
  {
    title: "5 Core Dimensions",
    description: "Multi-factor scoring testing demand, differentiation, feasibility, timing, and revenue viability.",
  },
  {
    title: "Real Competitors",
    description: "Uncovers incumbents and stealth rivals occupying your space so you never build in a vacuum.",
  },
  {
    title: "Actionable Next Steps",
    description: "Pinpoints high-risk assumptions with sharp pivot suggestions and runway calibration.",
  },
];

const DIMENSIONS = ["Market demand", "Differentiation", "Feasibility", "Timing", "Monetization"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const { navigate } = useRouter();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 pt-12 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:pt-24 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col lg:col-span-7"
        >
          <span className="inline-flex items-center gap-3 label-mono text-cyan">
            <span className="h-px w-8 bg-cyan" />
            AI-powered validation
          </span>

          <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,1.5rem+4vw,5.25rem)] leading-[1.02] text-balance text-ivory">
            Know if your startup idea is <em className="text-cyan">worth building.</em>
          </h1>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-ivory/70 sm:text-lg">
              Get a blunt, data-informed score before you spend months and money.
            </p>
            <p className="label-mono leading-relaxed text-ivory/45">
              No hype. No fluff. Just a sharper first decision.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ivory"
                size="lg"
                onClick={() => navigate("/validate")}
                className="group/cta h-14 gap-3 pr-2 pl-6 text-base font-medium cursor-pointer"
              >
                Score my idea
                <span className="flex size-10 items-center justify-center rounded-sm bg-ink text-cyan">
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:-rotate-45" />
                </span>
              </Button>
            </motion.div>

            <Button
              variant="line"
              size="lg"
              onClick={() => scrollToId("how-it-works")}
              className="h-14 px-6 text-base font-medium cursor-pointer"
            >
              How it works
            </Button>
          </div>
        </motion.div>

        {/* Index of what gets measured */}
        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative w-full lg:col-span-5 lg:max-w-md lg:justify-self-end"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2/80 p-6 backdrop-blur sm:p-7">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan/15 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="label-mono text-ivory/50">The instrument</span>
              <span className="label-mono text-cyan/80">0 — 100</span>
            </div>
            <ul className="relative mt-6">
              {DIMENSIONS.map((d, i) => (
                <li key={d} className="flex items-baseline gap-4 border-t border-line py-3">
                  <span className="font-mono text-xs text-ivory/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-heading text-2xl text-ivory">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </section>

      {/* Pillars / How It Works Section */}
      <section id="how-it-works" className="w-full scroll-mt-20 bg-ivory text-ink">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <span className="label-mono text-ink/55">Three-Pillar Evaluation</span>
              <h2 className="display mt-4 text-5xl text-ink sm:text-7xl">
                Engineered for cold, <em>objective truth.</em>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink/65 lg:col-span-5 lg:justify-self-end">
              We score your concept through the eyes of an exacting early-stage venture partner.
            </p>
          </Reveal>

          <RevealStagger className="mt-14 grid grid-cols-1 border-t border-ink/15 md:grid-cols-3" staggerDelay={0.1}>
            {PILLARS.map((pillar, index) => (
              <motion.button
                key={pillar.title}
                type="button"
                variants={revealItemVariants}
                onClick={() => navigate("/validate")}
                className="group flex flex-col gap-6 border-b border-ink/15 py-10 text-left md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 md:not-first:border-l cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="display text-7xl text-ink/15 transition-colors duration-500 group-hover:text-ember">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="size-6 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </div>
                <h3 className="font-heading text-4xl leading-tight text-ink">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">{pillar.description}</p>
              </motion.button>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="w-full bg-amber text-ink">
        <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-mono text-ink/60">Ready to stress-test your concept?</p>
            <h2 className="display mt-4 max-w-2xl text-5xl text-ink sm:text-7xl">
              One idea. One <em>honest</em> number.
            </h2>
          </div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="shrink-0">
            <Button
              variant="ink"
              size="lg"
              onClick={() => navigate("/validate")}
              className="group/cta h-14 gap-3 pr-2 pl-6 text-base font-medium cursor-pointer"
            >
              Validate your idea now
              <span className="flex size-10 items-center justify-center rounded-sm bg-amber text-ink">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:-rotate-45" />
              </span>
            </Button>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
