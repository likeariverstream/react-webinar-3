import React, { memo, useEffect } from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import "./style.css";

function Pagination(totalPages, {currentPage = 1}) {
  const currentPage = 98
  useEffect(() => {

  })

return (
  <nav className="Pagination">
    <ul className="pagination">
        <li>1</li>
        {currentPage > 3 && <li>...</li>}
        <li>{currentPage -1}</li>
        <li>{currentPage}</li>
        <li>{currentPage + 1}</li>
        {currentPage < (totalPages - 3) && <li>...</li>}
        <li>{totalPages}</li>
    </ul>
  </nav>
);
};

export default memo(Pagination)
