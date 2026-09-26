import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "../lib/router";
import { Button } from "./ui/button";

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ROUTE_META: Record<string, string> = {
    "/": "Venture intelligence",
    "/validate": "Step 01 · Intake",
    "/results": "Step 02 · Report",
};

export default function Navbar() {
    const { path, navigate } = useRouter();

    return (
        <nav className="sticky top-0 z-30 border-b border-line bg-ink/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
                <div className="flex items-center gap-6">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex items-center transition-opacity hover:opacity-80 cursor-pointer"
                    >
                        <img src="/logo.png" alt="FoundrScore" className="h-9 w-auto sm:h-10" />
                    </button>
                    <span className="hidden items-center gap-2 border-l border-line pl-6 label-mono text-ivory/45 md:flex">
                        <span className="size-1.5 rounded-full bg-cyan" />
                        {ROUTE_META[path] ?? ROUTE_META["/"]}
                    </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {path === "/" && (
                        <>
                            <button
                                type="button"
                                onClick={() => scrollToId("how-it-works")}
                                className="hidden label-mono text-ivory/60 transition-colors hover:text-ivory sm:block cursor-pointer"
                            >
                                How it works
                            </button>
                            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    variant="ivory"
                                    size="sm"
                                    onClick={() => navigate("/validate")}
                                    className="h-9 gap-1.5 px-4 text-[0.8rem] font-medium cursor-pointer"
                                >
                                    Validate Idea
                                    <ArrowUpRight className="size-3.5" />
                                </Button>
                            </motion.div>
                        </>
                    )}

                    {path === "/validate" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/")}
                            className="h-9 gap-1.5 px-3 label-mono text-ivory/60 hover:bg-ivory/5 hover:text-ivory cursor-pointer"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to Home
                        </Button>
                    )}

                    {path === "/results" && (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate("/")}
                                className="hidden h-9 px-3 label-mono text-ivory/60 hover:bg-ivory/5 hover:text-ivory sm:inline-flex cursor-pointer"
                            >
                                Home
                            </Button>
                            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                                <Button
                                    variant="ivory"
                                    size="sm"
                                    onClick={() => navigate("/validate")}
                                    className="h-9 gap-1.5 px-4 text-[0.8rem] font-medium cursor-pointer"
                                >
                                    Score another idea
                                    <ArrowUpRight className="size-3.5" />
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
