import { useState, useEffect } from "react";
import Navbar from "./Navbar";


export default function Home() {
    const [homeData, setHomeData] = useState();
    
    useEffect(() => {
        fetch('http://localhost:3001')
        .then((res) => res.json())
        .then((data) => setHomeData(data.message));
    });

    return (
        <div>
            <Navbar />
            <div className="border-2 border-blue-400 px-3 flex-none">
                <div className="border-2 border-black">Jack</div>
                <div className="border-2 border-black">miguel</div>
                <div className="border-2 border-black">bob</div>
                <div className="border-2 border-black">hiehcahi</div>
                <div className="border-2 border-black">jin</div>
            </div>
            {/* {homeData ? <p>{homeData}</p> : <p>Loading...</p>} */}
            {/* <p className="font-semibold mt-10">barra</p> */}
        </div>
    )
};