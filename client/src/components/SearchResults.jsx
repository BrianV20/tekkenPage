import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./Navbar";
import { correctName } from "../utils/functions";
// import Paginate from "./PaginateMoves";
import Paginate from "./Paginate";

export default function SearchResults() {
    const { searchText } = useParams();
    // const [textToSearch, setTextToSearch] = useState('');
    const [results, setResults] = useState({
        characters: [],
        moves: []
    });
    const navigate = useNavigate();

    //Moves variables
    const [currentPageMoves, setCurrentPageMoves] = useState(1);
    const [itemsPerPageMoves] = useState(15);
    // const [currentItemsMoves, setCurrentItemsMoves] = useState([]);
    // const [totalPages, setTotalPages] = useState(0);
    const indexOfLastItemMoves = currentPageMoves * itemsPerPageMoves;
    const indexOfFirstItemMoves = indexOfLastItemMoves - itemsPerPageMoves;
    const currentItemsMoves = results.moves.slice(indexOfFirstItemMoves, indexOfLastItemMoves);

    //Characters variables
    const [currentPageCharacters, setCurrentPageCharacters] = useState(1);
    const [itemsPerPageCharacters] = useState(15);
    const indexOfLastItemCharacters = currentPageCharacters * itemsPerPageCharacters;
    const indexOfFirstItemCharacters = indexOfLastItemCharacters - itemsPerPageCharacters;
    const currentItemsCharacters = results.characters.slice(indexOfFirstItemCharacters, indexOfLastItemCharacters);

    const paginateMoves = (pageNumber) => {
        setCurrentPageMoves(pageNumber);
    };

    const previousPageMoves = () => {
        if (currentPageMoves !== 1) {
           setCurrentPageMoves(currentPageMoves - 1);
        };
     };
   
     const nextPageMoves = () => {
        if (currentPageMoves < Math.ceil(results.moves.length / itemsPerPageMoves)) {
           setCurrentPageMoves(currentPageMoves + 1);
        };
    };

    const paginateCharacters = (pageNumber) => {
        setCurrentPageCharacters(pageNumber);
    };

    const previousPageCharacters = () => {
        if (currentPageCharacters !== 1) {
           setCurrentPageCharacters(currentPageCharacters - 1);
        };
     };
   
     const nextPageCharacters = () => {
        if (currentPageCharacters < Math.ceil(results.characters.length / itemsPerPageCharacters)) {
           setCurrentPageCharacters(currentPageCharacters + 1);
        };
    };
     

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
                            <div>
                                <p className="font-semibold" >Characters</p>
                                <div className="bg-red-200 flex flex-wrap justify-center">
                                    {currentItemsCharacters.map((char, i) => {
                                        return <div className="border-2 border-green-500 m-2 w-[6rem]" key={char + i} onClick={() => navigate(`/${char.characterName}`)}>
                                            <img src={char.data[0].img} alt={char.characterName + 'pic'} />
                                            <p>{correctName(char.characterName)}</p>
                                        </div>
                                    })}
                                </div>
                                <Paginate
                                    postsPerPage={itemsPerPageCharacters}
                                    totalPosts={results.characters.length}
                                    paginate={paginateCharacters}
                                    previousPage={previousPageCharacters}
                                    nextPage={nextPageCharacters}
                                />
                            </div>
                        ) : ''}
                        {results.moves.length > 0 ? (
                            // console.log("current items: " + currentItemsMoves),
                            <div>
                                <p className="font-semibold">Moves</p>
                                <div className="bg-violet-300 flex flex-wrap justify-center">
                                    {currentItemsMoves.map((move, i) => {
                                        return <div className="border-2 border-blue-500 m-2 flex w-[6rem] flex-col" key={move + i} onClick={() => navigate(`/${move.characterName}`)}>
                                            <img src={move.characterImg} alt={move.characterName + 'pic'} />
                                            <p>{move.move.command}</p>
                                        </div>
                                    })}
                                </div>
                                <Paginate
                                    postsPerPage={itemsPerPageMoves}
                                    totalPosts={results.moves.length}
                                    paginate={paginateMoves}
                                    previousPage={previousPageMoves}
                                    nextPage={nextPageMoves}
                                />
                            </div>
                        ) : ''}
                    </div>
                ) : <p>Loading...</p>}
            </div>
        </div>
    )
};