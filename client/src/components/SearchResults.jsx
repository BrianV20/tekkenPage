import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./Navbar";

export default function SearchResults() {
    const { searchText } = useParams();
    const [textToSearch, setTextToSearch] = useState('');
    const [results, setResults] = useState({
        characters: [],
        moves: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/search/${searchText}`)
            .then((res) => res.json())
            // .then((data) => setTextToSearch(data.message));
            .then((data) => {
                console.log(data);
                setResults({
                    characters: data.characters,
                    moves: data.moves
                });
            });
    }, [searchText])

    return (
        <div>
            <Navbar />
            <div>
                {/* <p>resultados de: {searchText}</p>
                {textToSearch ? <h2>{textToSearch}</h2> : 'nada'} */}
                {results ? (
                    // console.log(results),
                    <div className="flex flex-wrap">
                        {results.characters.length > 0 ? (
                            <div className="bg-red-200 m-4">
                                <p className="font-semibold" >Characters</p>
                                {results.characters.map((char, i) => {
                                    return <div className="border-2 border-green-500 m-2" key={char + i}>
                                        <p>{char.characterName}</p>
                                    </div>
                                })}
                            </div>
                        ) : ''}
                        {results.moves.length > 0 ? (
                            <div className="bg-violet-300">
                                <p className="font-semibold">Moves</p>
                                {results.moves.map((move, i) => {
                                    return <div className="border-2 border-blue-500 m-2 flex" key={move + i} onClick={() => navigate(`/${move.characterName}`)}>
                                        <img src={move.characterImg} alt={move.characterName + 'pic'} />
                                        <p>{move.move.command}</p>
                                    </div>
                                })}
                            </div>
                        ) : ''}
                    </div>
                ) : <p>Loading...</p>}
            </div>
        </div>
    )
};