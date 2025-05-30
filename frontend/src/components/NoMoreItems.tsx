import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const NoMoreItems: React.FC = () => {
  const { pickerId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="root-container mx-auto flex min-h-[40vh] w-full max-w-xs flex-col items-center justify-center rounded-xl bg-slate-950 p-8 text-white shadow-purple-glow">
      <div className="mb-2 text-center text-2xl font-semibold">
        Thank you for voting. You can view the results below.
      </div>
      <button
        className="rounded-lg bg-green-600 px-6 py-2 text-lg font-bold text-white shadow-md transition-colors hover:bg-green-700"
        onClick={() => navigate(`/picker/${pickerId}/result`)}
      >
        See Results
      </button>
    </div>
  );
};
