import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Button from "./Button";

export default function Pagination({ page, pageCount, onPageChange, className = "" }) {
  if (pageCount <= 1) return null;
  const canGoBack = page > 1;
  const canGoForward = page < pageCount;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={!canGoBack}
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoBack}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-medium">
        Page {page} of {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoForward}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(pageCount)}
        disabled={!canGoForward}
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
} 