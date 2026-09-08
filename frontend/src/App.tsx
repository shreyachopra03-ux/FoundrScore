import { useState } from "react";
import IdeaInputForm from "../src/components/IdeaInputForm";
import { type AnalyzeResponse } from "./types/index";

function App() {
  const [score, setScore] = useState<AnalyzeResponse | null>(null);

  return (
    <>
      <div className="heading font-extrabold m-0">
        FoundrScore Project
      </div>
      <IdeaInputForm onResult={setScore} />
      {score && <p>{JSON.stringify(score)}</p>}
    </>
  );
}

export default App;