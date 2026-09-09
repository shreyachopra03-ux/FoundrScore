import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function AnalysisLoader() {
  return (
    <div className="flex items-center justify-center py-10">
      <Badge className="text-sm px-4 py-2">
        <Spinner data-icon="inline-start" />
        Analyzing your idea...
      </Badge>
    </div>
  )
};