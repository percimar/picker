import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { CreatorPage } from "./pages/CreatorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PickerDetailsPage } from "./pages/PickerDetailsPage";
import { ResultsPage } from "./pages/ResultsPage";
import { VotePage } from "./pages/VotePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="picker" element={<Layout />}>
          <Route index element={<CreatorPage />} />
          <Route path=":pickerId" element={<PickerDetailsPage />} />
          <Route path=":pickerId/vote" element={<VotePage />} />
          <Route path=":pickerId/result" element={<ResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
