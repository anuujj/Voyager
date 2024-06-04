import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Transactions from "./pages/Transactions";
import TransactionInfo from "./pages/TransactionInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/transaction-info" element={<TransactionInfo />} />
        <Route path="/" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
