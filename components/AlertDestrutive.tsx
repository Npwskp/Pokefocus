import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { RxCross2 } from "react-icons/rx";

type alertProps = {
  message: string;
  setAlert: (alert: string) => void;
};

export function AlertDestructive({ message, setAlert }: alertProps) {
  return (
    <Alert
      variant="destructive"
      className="z-100 w-72 h-18 right-0 bottom-0 mb-4 mx-4 fixed bg-primary"
    >
      <div className="relative w-full h-full">
        <RxCross2
          className="h-4 w-4 cursor-pointer absolute right-0 top-0"
          onClick={() => setAlert("")}
        />
        <div className="flex flex-row gap-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
        </div>
        <div className="flex flex-row gap-2">
          <AlertCircle className="h-4 w-4 invisible" />
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
