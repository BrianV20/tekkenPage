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
                <div className="mx-2">
                    <div className="border-2 border-black rounded-lg gap-x-4 my-2 mx-3 flex text-xl items-center bg-blue-900 text-white">
                        <img src={moveData.characterImg} alt={`${correctName(characterName)} pic`} className="size-36" onClick={() => {
                            navigate(`/${characterName}`)
                        }} />
                        <div className="flex flex-col mx-auto flex-wrap">
                            <p className="text-3xl mx-auto">{correctName(characterName)}</p>
                            <p className="text-xl">{moveData.requestedMove.command}</p>
                        </div>
                    </div>

                    <div>
                        <div className="bg-lightblue grid grid-cols-5 break-words text-xl border-2 border-black font-semibold">
                            <p className="border-r-2 border-r-black">Command</p>
                            <p className="border-r-2 border-r-black">Hit level</p>
                            <p className="border-r-2 border-r-black">Damage</p>
                            <p className="border-r-2 border-r-black">Frames(startUp, block, hit, CH)</p>
                            <p>Notes</p>
                        </div>
                        <div className="grid grid-cols-5 border-2 break-words border-lightblue">
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
                                <p className="text-2xl font-semibold my-2">Similar moves</p>
                                <div className=" flex flex-nowrap gap-x-4 overflow-scroll">
                                    {/* {console.log("EL ARRAY ANTES DE HACER EL MAP DE LOS MOVIMIENOS SIMILARES: " + moveData.movesAlike.length)} */}
                                    {moveData.movesAlike.map((m, i) => {
                                        return <div key={m.move.command + i} className="border-2 border-black rounded-md flex flex-col min-w-[6rem] px-1 bg-blue-900 text-white" onClick={() => {
                                            navigate(`/${m.characterName}/${m.move.command}`)
                                            scrollTo(0, 0);
                                        }}>
                                            <img src={m.characterImg} alt={m.characterImg + " pic"} className="size-20 mb-3" />
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