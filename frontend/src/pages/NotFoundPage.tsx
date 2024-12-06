import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="root-container">
      <div className="text-2xl font-bold text-red-700">
        Error 404: Page Not Found
      </div>
      <div className="font-light">
        You're not supposed to be here silly goose
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-8 bg-transparent"
        onClick={() => navigate(import.meta.env.BASE_URL)}
      >
        <ArrowLeftIcon />
        Home
      </Button>
    </div>
  );
};
