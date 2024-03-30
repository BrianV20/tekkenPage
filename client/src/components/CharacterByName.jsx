import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar";
import Footer from "./Footer";

export default function CharacterByName() {
    const { characterName } = useParams();
    const [characterData, setCharacterData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    // const navigate = useNavigate();

    const toggleVisibility = () => {
        if(window.scrollY > 300){
            setIsVisible(!isVisible);
        };
    };

    const correctName = (charName) => {
        let temp = charName.split('_');
        if (temp.length > 1) {
            let n1 = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
            let n2 = temp[1].charAt(0).toUpperCase() + temp[1].slice(1);
            return n1 + " " + n2;
        }
        else {
            return temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/${characterName}`)
            .then((response) => response.json())
            .then((data) => setCharacterData(data));
    }, [characterName]);

    return (
        <div>
            <Navbar />
            {characterData ? (
                <div className="mx-2 mb-7">
                    <div className="border-2 border-black rounded-lg gap-x-4 mx-3 my-2 flex text-xl items-center bg-blue-900 text-white">
                        <img src={characterData[0].img} alt={`${correctName(characterName)} pic`} className="size-36" />
                        <p className="text-3xl">{correctName(characterName)} move list</p>
                    </div>
                    <div className="bg-lightblue grid grid-cols-5 break-words text-xl border-2 border-black font-semibold">
                        <p className="border-r-2 border-r-black">Command</p>
                        <p className="border-r-2 border-r-black">Hit level</p>
                        <p className="border-r-2 border-r-black">Damage</p>
                        <p className="border-r-2 border-r-black">Frames(startUp, block, hit, CH)</p>
                        <p>Notes</p>
                    </div>
                    <div className="grid grid-cols-1">
                        {characterData.map((move, i) => {
                            return i !== 0 ? (
                                <div key={move + i} className="grid grid-cols-5 border-2 border-lightblue break-words"
                                // onClick={() => {
                                //     const modifiedMove = move.command.split(' ').join('_');
                                //     console.log(modifiedMove);
                                //     navigate(`/${characterName}/${modifiedMove}`);
                                //     if(move.notes.includes('rage') || move.notes.includes('Rage')){
                                //         if(move.notes.includes('drive')){
                                //             // navigate(`/${characterName}/${}`)
                                //         }
                                //     }
                                // }}
                                >
                                    <p className="border-r-2 border-r-lightblue p-1">{move.command}</p>
                                    <p className="border-r-2 border-r-lightblue p-1">{move.hit_level}</p>
                                    <p className="border-r-2 border-r-lightblue p-1">{move.damage}</p>
                                    <div className="border-r-2 border-lightblue p-1">
                                        <p># {move.start_up_frame}</p>
                                        <p># {move.block_frame}</p>
                                        <p># {move.hit_frame}</p>
                                        <p># {move.counter_hit_frame}</p>
                                    </div>
                                    {/* <p>.{move.start_up_frame} .{move.block_frame} .{move.hit_frame} .{move.counter_hit_frame}</p> */}
                                    <p className="p-1">{move.notes ? move.notes : '-'}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                    {isVisible && (
                        <div className="z-20 fixed right-4 bottom-5 text-3xl bg-[#fb8500] py-3 px-5 rounded-full" onClick={() => {
                            window.scrollTo(0, 0);
                            setIsVisible(!isVisible);
                        }}>
                            <i className="fa-solid fa-arrow-up"></i>
                        </div>
                    )}
                </div>
                // <div className="border-2 border-blue-600 mx-3">
                //     <div className="bg-orange-200 flex divide-x-2">
                //         <p>Command</p>
                //         <p>Hit level</p>
                //         <p>Damage</p>
                //         <p>Frames(startUp, block, hit, CH)</p>
                //         <p>Notes</p>
                //     </div>
                //     <div className="bg-orange-300 flex flex-col">
                //         {characterData.map((move, i) => {
                //             return <div key={move + i} className="border-2 border-black flex">
                //                 <p>{move.command}</p>
                //                 <p>{move.hit_level}</p>
                //                 <p>{move.damage}</p>
                //                 <p>.{move.start_up_frame} . {move.block_frame} .{move.hit_frame} .{move.counter_hit_frame}</p>
                //                 <p>{move.notes}</p>
                //             </div>
                //         })}
                //     </div>
                //     {/* <p>{characterData[1].command}</p> */}
                // </div>
            ) : <p>Loading...</p>}
            <Footer />
        </div>
    )
};