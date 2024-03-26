import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TestComponent from "./components/TestComponent";
import CharacterByName from "./components/CharacterByName";

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/api' element={<TestComponent />} />
        <Route path='/:characterName' element={<CharacterByName />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
