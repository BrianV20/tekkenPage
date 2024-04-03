import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./Navbar";
import { correctName } from "../utils/functions";
import Footer from "./Footer";
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

    // useEffect(() => {}, [paginateCharacters]);

    return (
        <div>
            <Navbar />
            <div className="mb-7 mx-2 mt-2">
                {/* <p>resultados de: {searchText}</p>
                {textToSearch ? <h2>{textToSearch}</h2> : 'nada'} */}
                {results ? (
                    // console.log(results),
                    <div className="flex flex-wrap">
                        {results.characters.length > 0 ? (
                            <div>
                                <p className="font-semibold font-Lato text-2xl md:text-3xl">[Characters]</p>
                                <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center font-Lato mt-2 mb-4 md:mt-3">
                                    {currentItemsCharacters.map((char, i) => {
                                        return <div className="border-2 border-black w-[5rem] flex flex-col text-center break-words pt-2 pb-1 rounded-md bg-blue-900 p-[0.2rem] md:text-2xl md:pt-3 md:pb-2 md:w-[7rem]" key={char + i} onClick={() => navigate(`/${char.characterName}`)}>
                                            <img src={char.data[0].img} alt={char.characterName + 'pic'} />
                                            <p className="text-white">{correctName(char.characterName)}</p>
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
                                <p className="font-semibold font-Lato text-2xl mt-7 md:text-3xl">[Moves]</p>
                                <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center font-Lato mt-2 mb-4 md:mt-3 md:gap-x-3 md:gap-y-4">
                                    {currentItemsMoves.map((move, i) => {
                                        return <div className="border-2 border-black w-[5rem] flex flex-col text-center break-words pt-2 pb-1 rounded-md bg-blue-900 p-[0.2rem] md:text-2xl md:pt-3 md:pb-2 md:w-[7rem]" key={move + i} onClick={() => navigate(`/${move.characterName}/${move.move.command}`)}>
                                            <img src={move.characterImg} alt={move.characterName + 'pic'} />
                                            <p className="text-white">{move.move.command}</p>
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
            <Footer />
        </div>
    )
};