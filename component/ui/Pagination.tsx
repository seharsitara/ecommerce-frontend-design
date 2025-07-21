"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import React from "react";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const DOTS = "...";

function getPaginationRange(current: number, total: number, siblingCount: number) {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPageNumbers >= total) {
    return range(1, total);
  }
  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;
  const pages: (number | string)[] = [];
  if (!showLeftDots && showRightDots) {
    pages.push(...range(1, 3 + 2 * siblingCount), DOTS, total);
  } else if (showLeftDots && !showRightDots) {
    pages.push(1, DOTS, ...range(total - (2 + 2 * siblingCount), total));
  } else if (showLeftDots && showRightDots) {
    pages.push(1, DOTS, ...range(leftSibling, rightSibling), DOTS, total);
  }
  return pages;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "",
}) => {
  if (totalPages <= 1) return null;
  const paginationRange = getPaginationRange(currentPage, totalPages, siblingCount);

  const buttonBase =
    "inline-flex items-center justify-center rounded-md border px-3 py-1.5 mx-0.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButton = "bg-blue-600 text-white border-blue-600";
  const defaultButton = "bg-white text-gray-700 border-gray-300 hover:bg-blue-50";

  return (
    <nav className={twMerge("flex items-center justify-center", className)} aria-label="Pagination">
      <button
        className={twMerge(buttonBase, defaultButton)}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        className={twMerge(buttonBase, defaultButton)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {paginationRange.map((page, idx) =>
        page === DOTS ? (
          <span key={idx} className="px-2 text-gray-400 select-none">
            {DOTS}
          </span>
        ) : (
          <button
            key={page as number}
            className={twMerge(
              buttonBase,
              page === currentPage ? activeButton : defaultButton
            )}
            onClick={() => onPageChange(page as number)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}
      <button
        className={twMerge(buttonBase, defaultButton)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        className={twMerge(buttonBase, defaultButton)}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination; 