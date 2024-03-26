import { useState, useEffect } from "react";

export default function Navbar() {

    return (
        <div className="md:px-4">
            <div className="flex bg-orange-300 border-b-4 border-black">
                <div className="font-bold text-blue-600 text-xl w-[40%]">Tekken moves page</div>
                <div className="w-[60%] flex items-center gap-x-4">
                    <input type="text" placeholder="search characters, moves, etc" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
    )
};