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
        fetch('https://tekkenmoves.onrender.com/')
        .then((res) => res.json())
        .then((data) => {
            setHomeData(data);
            // setFiles(data.length);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mx-2 mb-7 lg:mx-40">
                <p className="text-2xl font-semibold mt-1 mb-2 font-Lato md:text-4xl md:mt-4 md:mb-5">[Roster]</p>
                {homeData ? (
                    <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center font-Lato md:gap-x-3 md:gap-y-4">
                        {homeData.map((file, i) => {
                            // setFiles(files + 1);
                            // return <div key={file[0].img + i}>{file.}</div>
                            let charName = correctName(file.characterName);
                            return <div className="border-2 border-black w-[5rem] flex flex-col text-center break-words text-xl pt-2 pb-1 rounded-md bg-blue-900 p-[0.2rem] md:text-2xl md:pt-3 md:pb-2 md:w-[7rem] px-2" key={file.data[0].img} onClick={() => navigate(`/${file.characterName}`)}>
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