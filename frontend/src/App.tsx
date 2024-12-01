import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VotePage } from "./pages/VotePage";
import { ResultsPage } from "./pages/ResultsPage";
import { CreatorPage } from "./pages/CreatorPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreatorPage />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
