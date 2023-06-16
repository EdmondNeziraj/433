import React from "react";
import { useMemo } from "react";

export const DOTS= '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from( { length }, (_, idx) => idx + start);
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        /**
         * Case 1:
         * If number of pages is less than the page numbers 
         * we want to show in our component
         * return the range [1...totalPageCount]
         */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // Calculate left and right sibling index and make sure 
        // they are within range 1 and totalPageCount
        const leftSibling = Math.max(currentPage - siblingCount, 1);
        const rightSibling = Math.min(currentPage + siblingCount, totalPageCount);

        const toShowLeftDots = leftSibling > 2;
        const toShowRightDots = rightSibling < totalPageCount - 2;

        firstPage = 1;
        lastPage = totalPageCount;

        /**
         * Case 2:
         * No left dots, yes right dots
         */
        if (!toShowLeftDots && toShowRightDots) {
            let leftItemCount = 3 + (2 * siblingCount);
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        /**
         * Case 3:
         * Yes left dots, no right dots
         */
        if (toShowLeftDots && !toShowRightDots) {
            let rightItemCount = 3 + (2 * siblingCount);
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            
            return [firstPage, DOTS, ...rightRange];
        }

        /**
         * Case 4:
         * show dots both sides 
         */

        if (toShowLeftDots && toShowRightDots) {
            let middleRange = range(leftSibling, rightSibling);
            
            return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
        }

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};