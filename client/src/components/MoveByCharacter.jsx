import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function MoveByCharacter() {
    const { characterName, selectedMove } = useParams();
    const [ moveData, setMoveData ] = useState({
        requestedMove: {},
        requestedMoveCharName: '',
        movesAlike: []
    });

    useEffect(() => {
        fetch(`http://localhost:3001/${characterName}/${selectedMove}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            setMoveData({
                requestedMove: data.requestedMove,
                requestedMoveCharName: data.characterName,
                movesAlike: data.moves
            });
        });
    }, []);

    return (
        <div>
            <Navbar />
            {moveData != undefined ? (
                <div>
                    Move by {moveData.requestedMoveCharName} - {moveData.requestedMove.command}
                </div>
            ) : <p>Loading</p>}
        </div>
    )
};