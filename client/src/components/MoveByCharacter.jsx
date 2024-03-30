import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function MoveByCharacter() {
    const { characterName, selectedMove } = useParams();
    const { charactersData, setCharactersData } = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/${characterName}/${selectedMove}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setCharactersData(data);
        });
    }, [characterName]);

    return (
        <div>
            <Navbar />
            Move by {characterName} {selectedMove}
        </div>
    )
};