import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, Board } from "./Pages";
import GlobalStyle from "./globalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;