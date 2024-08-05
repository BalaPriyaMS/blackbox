import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type PropsType = { msg: string };

const Alerts = ({ msg }: PropsType) => {
  return (
    <div className="absolute bottom-20 right-14">
      <Alert variant="destructive" className=" w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{msg}</AlertDescription>
      </Alert>
    </div>
  );
};

export default Alerts;
