import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [textToSearch, setTextToSearch] = useState("");
    // const [searchRequest, setSearchRequest] = useState('');
    const navigate = useNavigate();

    const handleSearchTextChange = (e) => {
        setTextToSearch(e.target.value);
    };

    const handleSearch = () => {
        console.log("TEXT A BUSCAR: " + textToSearch);
        navigate(`/search/${textToSearch}`);
    };

    return (
        <div className="lg:px-5">
            <div className="flex bg-[#fb8600d4] border-b-4 border-black w-full p-2 bg-[url('/tekken3.jpg')] md:p-4">
                <div className="font-bold text-2xl w-[40%] font-Page-Title flex flex-col pl-5 text-white md:text-3xl" onClick={() => navigate('/')}>
                    <p>Tekken</p>
                    <p>Moves</p>
                </div>
                <div className="w-[60%] flex items-center gap-x-4 justify-end">
                    <div className=" py-2 px-2 min-h-[2.5rem] flex items-center text-[1.4rem] rounded-md md:text-[1.5rem]">
                        <input type="text"
                            placeholder="Search"
                            defaultValue={''}
                            onChange={handleSearchTextChange}
                            className="w-[10rem] rounded-l-md pl-1 md:min-w-[15rem]"
                        />
                        <div className="bg-blue-800 px-1 text-white rounded-r-md">
                            <i 
                                className="fa-solid fa-magnifying-glass"
                                onClick={handleSearch}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};