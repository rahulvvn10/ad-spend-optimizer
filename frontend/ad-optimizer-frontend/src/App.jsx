import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Strategies from "./pages/Strategies";
import Insights from "./pages/Insights";

function App() {
  return (<>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
