import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import GridPaperPanel from "../components/GridPaperPanel";
import { Button } from "../components/ui/button";
import { useRouter } from "../lib/router";

const PILLARS = [
  {
    title: "5 Core Dimensions",
    description: "Multi-factor scoring testing demand, differentiation, feasibility, timing, and revenue viability.",
    tone: "mint" as const,
  },
  {
    title: "Real Competitors",
    description: "Uncovers incumbents and stealth rivals occupying your space so you never build in a vacuum.",
    tone: "peach" as const,
  },
  {
    title: "Actionable Next Steps",
    description: "Pinpoints high-risk assumptions with sharp pivot suggestions and runway calibration.",
    tone: "sky" as const,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const { navigate } = useRouter();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-7 px-4 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center gap-5"
        >
          <span className="rounded-full bg-foreground/10 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-foreground/80 uppercase backdrop-blur">
            AI-powered validation
          </span>

          <h1 className="font-heading text-4xl leading-[1.12] font-bold text-balance text-foreground sm:text-6xl">
            Know if your startup idea
            <br />
            is worth building.
          </h1>

          <p className="max-w-lg text-balance text-base sm:text-lg text-foreground/75">
            Get a blunt, data-informed score before you spend months and money.
          </p>

          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground/60">
            <Sparkles className="size-3.5 text-primary" />
            No hype. No fluff. Just a sharper first decision.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="gradient"
                size="lg"
                onClick={() => navigate("/validate")}
                className="gap-2 px-7 py-3 font-semibold text-white shadow-md cursor-pointer text-sm"
              >
                Score my idea
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToId("how-it-works")}
                className="px-7 py-3 font-semibold border-border bg-card text-foreground hover:bg-secondary cursor-pointer text-sm"
              >
                How it works
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pillars / How It Works Section */}
      <section id="how-it-works" className="w-full scroll-mt-24 border-t border-border/60 py-20 px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Three-Pillar Evaluation
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for cold, objective truth.
            </h2>
            <p className="max-w-md text-balance text-sm text-foreground/70">
              We score your concept through the eyes of an exacting early-stage venture partner.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="h-full"
              >
                <GridPaperPanel
                  size="block"
                  tone={pillar.tone}
                  title={pillar.title}
                  description={pillar.description}
                  onAction={() => navigate("/validate")}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 text-center">
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Ready to stress-test your concept?
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="gradient"
                size="lg"
                onClick={() => navigate("/validate")}
                className="gap-2 px-8 py-3 font-semibold cursor-pointer shadow-md"
              >
                Validate your idea now
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
