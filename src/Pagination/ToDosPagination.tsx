import Pagination from 'react-js-pagination';
import React, { useState,FC } from 'react';



// const ReactPagination :FC = ( getData:[]) => {
//     const [activePage, setActivePage] = useState(1); // Active page number
//     const itemsPerPage = 10; // Number of items to display per page
//     const totalItemsCount = getData.length; // Total number of items
  
//     // Calculate start and end index of the items to display on the current page
//     const startIndex = (activePage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
  
//     // Slice the data array to display only the items on the current page
//     const currentData = getData.slice(startIndex, endIndex);
  
//     // Handle page change
//     const handlePageChange = (pageNumber:any) => {
//       setActivePage(pageNumber);
//     };
  
//     return (
//       <div>
//         <ul>
//           {currentData.map((item:any) => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//         <Pagination
//           activePage={activePage}
//           itemsCountPerPage={itemsPerPage}
//           totalItemsCount={totalItemsCount}
//           onChange={handlePageChange}
//           itemClass="page-item"
//           linkClass="page-link"
//         />
//       </div>
//     );
//   };
  
//   export default ReactPagination;
  