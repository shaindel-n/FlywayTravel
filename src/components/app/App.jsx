import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Hotels } from "../hotels/hotels";
import { Home } from "../home/home";
import { Header } from "../header/header";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
