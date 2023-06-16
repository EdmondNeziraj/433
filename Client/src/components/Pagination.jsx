import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import "../styles/Pagination.css";

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={`pagination-container ${className ? className : ""}`}>
            <li className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`} 
                onClick={onPrevious}
            >
                <div className="arrow left"></div>
            </li>

            {paginationRange.map((pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230</li>
                }

                return(
                    <li
                        className={`pagination-item ${pageNumber === currentPage ? "selected" : ""}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            }))}
            <li
                className={`pagination-item ${currentPage === lastPage ? "disabled" : ""}`}
                onClick={onNext}
            >
                <div className="arrow right"></div>
            </li>
        </ul>
    )
}

export default Pagination;