import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function CharacterByName() {
    const { characterName } = useParams();
    const [characterData, setCharacterData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/${characterName}`)
        .then((response) => response.json())
        .then((data) => setCharacterData(data));
    }, [characterName]);

    return (
        <div>
            {characterData ? (
                console.log(characterData) //SEGUIR CON ESTO, MOSTRAR BIEN LA INFORMACION, POR AHORA SOLO LA NAVBAR, ALGO DE INFORMACION DEL PERSONAJE Y SUS MOVMIENTOS
            ) : <p>Loading...</p>}
        </div>
    )
};