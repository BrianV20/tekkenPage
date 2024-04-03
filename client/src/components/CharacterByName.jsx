import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import { correctName } from "../utils/functions";

export default function CharacterByName() {
    const { characterName } = useParams();
    const [characterData, setCharacterData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const toggleVisibility = () => {
        if(window.scrollY > 300){
            setIsVisible(!isVisible);
        };
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
                <div className="mx-2 mb-7 lg:px-40">
                    <div className="border-2 border-black rounded-lg gap-x-4 mx-3 my-2 flex text-xl items-center bg-blue-900 text-white font-Lato md:gap-x-8 md:mx-10 md:mt-6 md:mb-4 lg:mx-36">
                        <img src={characterData[0].img} alt={`${correctName(characterName)} pic`} className="size-36 md:size-44" />
                        <p className="text-3xl md:text-4xl">{correctName(characterName)} - Move list</p>
                    </div>
                    <div className="bg-lightblue grid grid-cols-5 break-words text-xl border-2 border-black font-semibold text-center font-Lato md:text-2xl">
                        <p className="border-r-2 border-r-black md:p-1">Command</p>
                        <p className="border-r-2 border-r-black md:p-1">Hit level</p>
                        <p className="border-r-2 border-r-black md:p-1">Damage</p>
                        <p className="border-r-2 border-r-black md:p-1">Frames(start-up, block, hit, CH)</p>
                        <p className="md:p-1">Notes</p>
                    </div>
                    <div className="grid grid-cols-1 font-Default">
                        {characterData.map((move, i) => {
                            return i !== 0 ? (
                                <div key={move + i} className="grid grid-cols-5 border-2 border-lightblue break-words md:text-xl"
                                onClick={() => {
                                    // const modifiedMove = move.command.split(' ').join('_');
                                    // console.log(modifiedMove);
                                    // navigate(`/${characterName}/${modifiedMove}`);
                                    navigate(`/${characterName}/${move.command}`);
                                    // if(move.notes.includes('rage') || move.notes.includes('Rage')){
                                    //     if(move.notes.includes('drive')){
                                    //         navigate(`/${characterName}/${}`)
                                    //     }
                                    // }
                                }}
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
                        <div className="z-20 fixed right-4 bottom-5 text-3xl bg-[#fb8500] py-3 px-5 rounded-full md:py-5 md:px-7 md:text-4xl" onClick={() => {
                            window.scrollTo(0, 0);
                            setIsVisible(!isVisible);
                        }}>
                            <i className="fa-solid fa-arrow-up"></i>
                        </div>
                    )}
                </div>
            ) : <p>Loading...</p>}
            <Footer />
        </div>
    )
};