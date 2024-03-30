import { Navigate, useNavigate } from "react-router-dom"

export default function Footer() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-800 text-white flex flex-row justify-evenly border-t-2 border-t-black">
            <div className="flex w-[40%] gap-x-2 items-center">
                <p onClick={() => navigate('/')}>Home</p>
                <i className="fa-solid fa-home" onClick={() => navigate('/')}></i>
            </div>
            <p className="w-[40%]">Tekken moves derechos reservados 2024</p>
        </div>
    )
}