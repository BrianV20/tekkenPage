import { Navigate, useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-800 text-white flex flex-row justify-evenly border-t-2 border-t-black font-Lato py-2 md:py-6 md:text-xl">
            <div className="flex w-[40%] gap-x-2 items-center">
                <i className="fa-solid fa-home" onClick={() => navigate('/')}></i>
                <p onClick={() => navigate('/')}>Home</p>
            </div>
            <p className="w-[40%]">Tekken moves derechos reservados 2024</p>
        </div>
    )
}