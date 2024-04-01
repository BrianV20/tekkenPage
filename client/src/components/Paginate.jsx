// Navigate.js
 
import React from 'react';
 
const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <div className="flex justify-center text-2xl">
        <i className='fa-solid fa-arrow-left' onClick={previousPage}></i>
         <ul className='flex gap-x-2 flex-wrap'>
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
               >
                  {number}
               </li>
            ))}
         </ul>
         <i className='fa-solid fa-arrow-right' onClick={nextPage}></i>
      </div>
   );
};
 
export default Paginate;