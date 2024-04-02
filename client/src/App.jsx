import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TestComponent from "./components/TestComponent";
import CharacterByName from "./components/CharacterByName";
import SearchResults from "./components/SearchResults";
import MoveByCharacter from "./components/MoveByCharacter";

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/api' element={<TestComponent />} />
        <Route path='/search/:searchText' element={<SearchResults />} />
        <Route path='/:characterName/:selectedMove' element={<MoveByCharacter />} />
        <Route path='/:characterName' element={<CharacterByName />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
