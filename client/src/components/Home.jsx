import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { correctName } from "../utils/functions";


export default function Home() {
    const [homeData, setHomeData] = useState();
    // const [files, setFiles] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('http://localhost:3001')
        .then((res) => res.json())
        .then((data) => {
            setHomeData(data);
            // setFiles(data.length);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mx-2 mb-7">
                <p className="text-2xl font-semibold mt-1 mb-2 font-Default">Roster</p>
                {homeData ? (
                    <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center">
                        {homeData.map((file, i) => {
                            // setFiles(files + 1);
                            // return <div key={file[0].img + i}>{file.}</div>
                            let charName = correctName(file.characterName);
                            return <div className="border-2 border-black w-[5rem] flex flex-col text-center break-words text-xl pt-2 pb-1 rounded-md bg-blue-900 font-Default p-[0.2rem]" key={file.data[0].img} onClick={() => navigate(`/${file.characterName}`)}>
                                <img src={file.data[0].img} alt={file.characterName} className="bg-blue-900" />
                                <p className="text-white">{charName}</p>
                            </div>
                        })}
                        {/* <p>Los jsons: {files}</p> */}
                    </div>
                ) : <p>Loading...</p>}
            </div>
            <Footer />
        </div>
    )
};