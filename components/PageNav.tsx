import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export function PageNav({
  totalPages = 0,
  setPageNo,
}: {
  totalPages: number;
  setPageNo: Function;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const decreasePage = () => {
    let page = currentPage;
    if (page > 0) {
      page--;
      setCurrentPage(page);
      setPageNo(page);
    }
  };
  const increasePage = () => {
    let page = currentPage;
    if (page >= 0 && page < totalPages - 1) {
      page++;
      setCurrentPage(page);
      setPageNo(page);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-evenly mt-4">
        <button
          type="button"
          className="mr-2"
          aria-label="Left"
          onClick={() => decreasePage()}
        >
          <ArrowLeftCircleIcon className="h-7 w-7 cursor-pointer text-white" />
        </button>
        <div className="text-white flex">
          {`${currentPage + 1}`} of {`${totalPages}`}
        </div>
        <button
          type="button"
          className="ml-2"
          aria-label="Right"
          onClick={() => increasePage()}
        >
          <ArrowRightCircleIcon className="h-7 w-7 cursor-pointer text-white" />
        </button>
      </div>
    </div>
  );
}
