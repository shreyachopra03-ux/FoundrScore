import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "../lib/router";
import { Button } from "./ui/button";

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
    const { path, navigate } = useRouter();

    return (
        <nav className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center transition-opacity hover:opacity-90 cursor-pointer"
                >
                    <img
                        src="/logo.png"
                        alt="FoundrScore"
                        className="h-11 w-auto filter-[brightness(0)]"
                    />
                </button>

                <div className="flex items-center gap-3">
                    {path === "/" && (
                        <>
                            <button
                                type="button"
                                onClick={() => scrollToId("how-it-works")}
                                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block cursor-pointer"
                            >
                                How it works
                            </button>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={() => navigate("/validate")}
                                    className="cursor-pointer font-semibold shadow-xs"
                                >
                                    Validate Idea
                                </Button>
                            </motion.div>
                        </>
                    )}

                    {path === "/validate" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/")}
                            className="gap-1.5 text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to Home
                        </Button>
                    )}

                    {path === "/results" && (
                        <div className="flex items-center gap-2.5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/")}
                                className="hidden sm:inline-flex text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                Home
                            </Button>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={() => navigate("/validate")}
                                    className="gap-1.5 cursor-pointer font-semibold"
                                >
                                    <Sparkles className="size-3.5" />
                                    Score another idea
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
