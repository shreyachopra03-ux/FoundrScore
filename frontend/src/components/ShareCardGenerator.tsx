import { type AnalyzeResponse } from '../types/index';

const SharedCardGenerator = ({ result }: { result: AnalyzeResponse }) => {
    return (
    <>
    <div>
    <p className="font-extrabold">{result.founderScore}</p>
    <p>{result.verdict}</p>
    <p>{result.shareSummary}</p>
    </div>
    </>
    )
};

export default SharedCardGenerator;