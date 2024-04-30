import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage";
import ChatPage from "./components/chatpage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
