import { cn } from "@/lib/utils";
import { CheckCircle2, Clipboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";

export type LinkToCopyProps = {
  label: string;
  value: string;
};

export const LinkToCopy = ({ label, value }: LinkToCopyProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };
  return (
    <div>
      <Label htmlFor="voterLink" className="text-lg">
        {label}
      </Label>
      <div className="flex w-full items-center space-x-2">
        <Input type="url" value={value} className="text-black" readOnly />
        <Button
          type="button"
          variant="secondary"
          className={cn(
            copied && "bg-green-500 hover:bg-green-600",
            "min-w-24",
          )}
          onClick={copy}
        >
          {copied ? <CheckCircle2 /> : <Clipboard />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};
