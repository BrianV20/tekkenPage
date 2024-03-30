import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Home() {
    const [homeData, setHomeData] = useState();
    const [files, setFiles] = useState(0);
    const navigate = useNavigate();

    const correctName = (charName) => {
        let temp = charName.split('_');
        if(temp.length > 1) {
            let n1 = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
            let n2 = temp[1].charAt(0).toUpperCase() + temp[1].slice(1);
            return n1 + " " + n2;
        }
        else {
            return temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
        }
    }; 
    
    useEffect(() => {
        fetch('http://localhost:3001')
        .then((res) => res.json())
        .then((data) => {
            setHomeData(data);
            setFiles(data.length);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mx-2 mb-7">
                <p className="text-2xl font-semibold">Roster</p>
                {homeData ? (
                    <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center">
                        {homeData.map((file, i) => {
                            // setFiles(files + 1);
                            // return <div key={file[0].img + i}>{file.}</div>
                            let charName = correctName(file.characterName);
                            return <div className="border-2 border-black w-[5rem] flex flex-col text-center break-words text-xl pt-2 pb-1 rounded-md bg-blue-900" key={file.data[0].img} onClick={() => navigate(`/${file.characterName}`)}>
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