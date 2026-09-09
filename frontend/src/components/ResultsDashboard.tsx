import { type AnalyzeResponse } from "../types/index";

export const ResultsDashboard = ({ result }: { result: AnalyzeResponse }) => {
    return (
        <>
        <p className="score font-bold size-1.5">{result.founderScore}</p>
        <p className="verdict bg-red-500">{result.verdict}</p>
        <div>
            {Object.entries(result.scoreBreakdown).map(([key, value]) => (
                <p key={key}>{key} : {value}</p>
            ))}
        </div>

        <p className="bg-pink-500">{result.marketTimingAnalysis}</p>

        <ul>
            {result.improvements.map((item, index) => (
                <li key={index}>
                    <p>{item.issue}</p>: {item.fix}
                </li>
            ))}
        </ul>

        <ul>
            {result.competitorLandscape.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>

        {result.budgetAnalysis && <p>{JSON.stringify(result.budgetAnalysis)}</p>}

        <p className="bg-amber-600">{result.shareSummary}</p>
        </>
    )
};