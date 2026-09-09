import { useState } from "react";
import IdeaInputForm from "./components/IdeaInputForm";
import { type AnalyzeResponse } from "./types/index";
import AnalysisLoader from "./components/AnalysisLoader";
import { ResultsDashboard } from "./components/ResultsDashboard";
import SharedCardGenerator from "./components/ShareCardGenerator";

function App() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="heading font-extrabold m-0 p-0">
        FoundrScore
      </div>
      <IdeaInputForm onResult={setResult} loading={loading} setLoading={setLoading} />
      {loading && <AnalysisLoader />}
      {result && <ResultsDashboard result={result} />}
      {result && <SharedCardGenerator result={result} />}
    </>
  );
}

export default App;