import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [textToSearch, setTextToSearch] = useState("");
    const [searchRequest, setSearchRequest] = useState('');
    const navigate = useNavigate();

    const handleSearchTextChange = (e) => {
        setTextToSearch(e.target.value);
    };

    const handleSearch = () => {
        console.log("TEXT A BUSCAR: " + textToSearch);
        navigate(`/search/${textToSearch}`);
    };

    return (
        <div className="md:px-4">
            <div className="flex bg-[#fb8500] border-b-4 border-black w-full">
                <div className="font-bold text-xl w-[40%]">Tekken moves page</div>
                <div className="w-[60%] flex items-center gap-x-4">
                    <input type="text"
                        placeholder="search characters, moves, etc"
                        defaultValue={''}
                        onChange={handleSearchTextChange}
                    />
                    <i 
                        className="fa-solid fa-magnifying-glass"
                        onClick={handleSearch}
                    ></i>
                </div>
            </div>
        </div>
    )
};