import { useState } from "react";
import { type AnalyzeRequest, type AnalyzeResponse } from "../types/index";
import analyzeIdea from "../api/apiClient";

interface Props {
    onResult : (result: AnalyzeResponse) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
}

const IdeaInputForm = ({ onResult, loading, setLoading }: Props) => {
    const [idea, setIdea] = useState("");
    const [budgetINR, setBudgetINR] = useState<number | undefined>(undefined);
    const [industry, setIndustry] = useState("");
    const [error, setError] = useState("");

    async function submitHandler (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const input: AnalyzeRequest = { idea, budgetINR, industry };

        try {
            const result = await analyzeIdea(input);
            onResult(result);
        } catch {
            setError("Something went wrong, Try again.");
         } finally {
            setLoading(false);
        }
        }
       
    return (
        <form onSubmit={submitHandler}>
            <div className="form-fields">
            <input 
            type="text" 
            placeholder="Idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="Budget INR"
            value={budgetINR} 
            onChange={(e) => setBudgetINR(Number(e.target.value))}
            />
            <input 
            type="text" 
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            />
            </div>
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading} className="button p-2 m-2 border-2">
                {loading ? "Analyzing..." : "Submit"}
            </button>
        </form>
    )
};

export default IdeaInputForm;