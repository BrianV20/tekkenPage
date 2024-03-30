import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";

export default function SearchResults() {
    const { searchText } = useParams();
    const [textToSearch, setTextToSearch] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3001/search/${searchText}`)
        .then((res) => res.json())
        .then((data) => setTextToSearch(data.message));
    }, [searchText])

    return (
        <div>
            <Navbar />
            <div>
                <p>resultados de: {searchText}</p>
                {textToSearch ? <h2>{textToSearch}</h2> : 'nada'}
            </div>
        </div>
    )
};