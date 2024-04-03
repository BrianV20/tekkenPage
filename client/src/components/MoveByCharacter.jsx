import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { correctName } from "../utils/functions";

export default function MoveByCharacter() {
    const { characterName, selectedMove } = useParams();
    const [moveData, setMoveData] = useState({
        requestedMove: {},
        characterImg: '',
        movesAlike: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/${characterName}/${selectedMove}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setMoveData({
                    requestedMove: data.requestedMove,
                    characterImg: data.characterImg,
                    movesAlike: data.moves
                });
            });
    }, [characterName]);

    return (
        <div>
            <Navbar />
            {moveData != undefined ? (
                <div className="mx-2 lg:px-40">
                    <div className="border-2 border-black rounded-lg gap-x-4 my-2 mx-3 flex text-xl items-center bg-blue-900 text-white md:gap-x-8 md:mx-10 md:mt-6 md:mb-4 lg:mx-36">
                        <img src={moveData.characterImg} alt={`${correctName(characterName)} pic`} className="size-36 md:size-44" onClick={() => {
                            navigate(`/${characterName}`)
                        }} />
                        {window.innerWidth < 1024 ? (
                            <div className="flex flex-col mx-auto flex-wrap md:text-center">
                                <p className="text-3xl mx-auto md:text-4xl">{correctName(characterName)}</p>
                                <p className="text-xl md:text-3xl">{moveData.requestedMove.command}</p>
                            </div>
                        ) : (
                            <div className="flex flex-row flex-wrap md:text-center text-3xl md:text-4xl">
                            <p>{correctName(characterName)}</p>
                            <p className="lg:mx-4">-</p>
                            <p>{moveData.requestedMove.command}</p>
                        </div>
                        )}
                    </div>

                    <div>
                        <div className="bg-lightblue grid grid-cols-5 break-words text-xl border-2 border-black font-semibold text-center md:text-2xl font-Lato">
                            <p className="border-r-2 border-r-black md:p-1">Command</p>
                            <p className="border-r-2 border-r-black md:p-1">Hit level</p>
                            <p className="border-r-2 border-r-black md:p-1">Damage</p>
                            <p className="border-r-2 border-r-black md:p-1">Frames(start-up, block, hit, CH)</p>
                            <p className=" md:p-1">Notes</p>
                        </div>
                        <div className="grid grid-cols-5 border-2 break-words border-lightblue md:text-xl font-Default">
                            <p className="border-r-2 border-lightblue p-1">{moveData.requestedMove.command}</p>
                            <p className="border-r-2 border-lightblue p-1">{moveData.requestedMove.hit_level}</p>
                            <p className="border-r-2 border-lightblue p-1">{moveData.requestedMove.damage}</p>
                            <div className="border-r-2 border-lightblue p-1">
                                <p># {moveData.requestedMove.start_up_frame}</p>
                                <p># {moveData.requestedMove.block_frame}</p>
                                <p># {moveData.requestedMove.hit_frame}</p>
                                <p># {moveData.requestedMove.counter_hit_frame}</p>
                            </div>
                            <p className="p-1">{moveData.requestedMove.notes ? moveData.requestedMove.notes : '-'}</p>
                        </div>
                    </div>

                    <div className="mt-10 mb-8">
                        {moveData.movesAlike.length > 0 ? (
                            <div>
                                <p className="text-2xl font-semibold my-2 md:text-4xl md:my-4">Similar moves</p>
                                <div className="flex flex-nowrap overflow-x-auto gap-x-4 overflow-scroll md:gap-x-6 md:text-xl">
                                    {moveData.movesAlike.map((m, i) => {
                                        return <div key={m.move.command + i} className="border-2 border-black rounded-md flex flex-col  px-1 bg-blue-900 min-w-[6rem] text-white md:px-2  break-words md:min-w-[8rem] lg:min-w-[10rem]" onClick={() => {
                                            navigate(`/${m.characterName}/${m.move.command}`)
                                            scrollTo(0, 0);
                                        }}>
                                            <img src={m.characterImg} alt={m.characterImg + " pic"} className="sm:size-20 mb-3 md:size-32 mx-auto mt-2" />
                                            <div>
                                                <p>{m.move.command}</p>
                                                <p>{m.move.hit_level}</p>
                                                <p>{m.move.damage}</p>
                                                <div>
                                                    <p># {m.move.start_up_frame}</p>
                                                    <p># {m.move.block_frame}</p>
                                                    <p># {m.move.hit_frame}</p>
                                                    <p># {m.move.counter_hit_frame}</p>
                                                </div>
                                                <p className="p-1">{m.move.notes ? m.move.notes : '-'}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
            ) : <p>Loading</p>}
            <Footer />
        </div>
    )
};