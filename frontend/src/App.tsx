import { useState } from "react";
import IdeaInputForm from "../src/components/IdeaInputForm";
import { type AnalyzeResponse } from "./types/index";

function App() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  return (
    <>
      <div className="heading font-extrabold m-0 p-0">
        FoundrScore
      </div>
      <IdeaInputForm onResult={setResult} />
      {result && <p>{JSON.stringify(result)}</p>}
    </>
  );
}

export default App;