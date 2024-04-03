import React, { useState } from 'react';

const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
    const [activePage, setActivePage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number) => {
        paginate(number);
        setActivePage(number);
    };

    const handlePrevious = () => {
        previousPage();
        if (activePage !== 1) {
            setActivePage(activePage - 1);
        }
    };

    const handleNext = () => {
        nextPage();
        if (activePage < Math.ceil(totalPosts / postsPerPage)) {
            setActivePage(activePage + 1);
        }
    };

    return (
        <div className="flex justify-center text-2xl gap-x-3 mx-2 md:text-3xl md:gap-x-4">
            <i className='fa-solid fa-arrow-left' onClick={handlePrevious}></i>
            <ul className='flex gap-x-2 flex-wrap md:gap-x-4'>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => handleClick(number)}
                        className={`border-2 border-black px-1 rounded-lg mb-2 md:px-2 md:py-1 md:mb-3 ${number === activePage ? 'bg-black text-white' : ''}`}
                    >
                        {number}
                    </li>
                ))}
            </ul>
            <i className='fa-solid fa-arrow-right' onClick={handleNext}></i>
        </div>
    );
};

export default Paginate;