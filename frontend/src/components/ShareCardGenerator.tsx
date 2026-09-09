import { type AnalyzeResponse } from '../types/index';

const sharedCardGenerator = ({ result }: { result: AnalyzeResponse }) => {
    <>
    <div>
    <p className="font-extrabold">{result.founderScore}</p>
    <p>{result.verdict}</p>
    <p>{result.shareSummary}</p>
    </div>
    </>
};

export default sharedCardGenerator;