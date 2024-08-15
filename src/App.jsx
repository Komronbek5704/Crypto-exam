import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CryptoPage from "./pages/CryptoPage"; 
import CryptoChart from "./pages/CryptoChart";
import NotFound from "./pages/NotFound";
import Error404 from "./pages/404";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CryptoPage />} />
            <Route path="/crypto/:cryptoId" element={<CryptoChart />} />
            <Route path="*" element={<NotFound />} /> 
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
