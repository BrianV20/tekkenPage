import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TestComponent from "./components/TestComponent";

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/api' element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
