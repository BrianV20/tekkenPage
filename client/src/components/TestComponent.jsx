import { useState, useEffect } from 'react'

function TestComponent() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://tekkenmoves.onrender.com//api')
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

export default TestComponent