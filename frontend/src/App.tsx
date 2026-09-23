import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RouterProvider, useRouter } from "./lib/router";
import Navbar from "./components/Navbar";
import BackgroundDecor from "./components/BackgroundDecor";
import HomePage from "./pages/HomePage";
import ValidatePage from "./pages/ValidatePage";
import ResultsPage from "./pages/ResultsPage";
import { type AnalyzeResponse } from "./types/index";

const STORAGE_KEY = "foundrscore_latest_result";

function AppContent() {
  const { path } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize from sessionStorage if available
  const [result, setResult] = useState<AnalyzeResponse | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = sessionStorage.getItem(STORAGE_KEY);
      return cached ? (JSON.parse(cached) as AnalyzeResponse) : null;
    } catch {
      return null;
    }
  });

  const handleResult = (newResult: AnalyzeResponse) => {
    setResult(newResult);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newResult));
    } catch {
      // Ignore storage errors
    }
  };

  const handleReset = () => {
    setResult(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      <BackgroundDecor />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {path === "/validate" ? (
            <motion.div
              key="validate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ValidatePage
                onResult={handleResult}
                loading={loading}
                setLoading={setLoading}
              />
            </motion.div>
          ) : path === "/results" ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ResultsPage result={result} onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <HomePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full border-t border-border/60 py-8 text-center">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          FoundrScore &middot; Calibrated for 2026 early-stage venture truth
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
