import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/api')
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  return (
    <>
      {data ? (
        data
      ) : <p>Loading...</p>}
    </>
  )
}

export default App