import { useEffect } from "react";
import { IPaginationList } from "../../utils/constants";

export const Pagination = ({
  limit,
  totalRecords,
  pagination,
  paginationFunc,
}: {
  limit: number;
  totalRecords: number;
  pagination: IPaginationList;
  paginationFunc: React.Dispatch<React.SetStateAction<IPaginationList>>;
}) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function setPage(pageNo: number) {
    if (pageNo <= pages.length && pageNo > 0)
      paginationFunc({ ...pagination, page: pageNo });
  }

  useEffect(() => {}, [pagination]);

  return (
    <nav className="my-5 w-full flex justify-center">
      <ul className="list-style-none flex">
        <li>
          <button
            onClick={() => setPage(pagination.page - 1)}
            className="relative block rounded bg-transparent px-3 py-1.5 mx-1 text-sm text-surface transition duration-300 hover:bg-indigo-50"
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} aria-current="page" className="mx-1">
            <button
              onClick={() => setPage(page)}
              className={`relative block rounded px-3 p-1.5 text-sm text-surface transition duration-300 ${
                page === pagination.page
                  ? "bg-indigo-700 hover:bg-indigo-900 text-white"
                  : "hover:bg-indigo-50 bg-transparent"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setPage(pagination.page + 1)}
            className="relative block rounded bg-transparent px-3 py-1.5 mx-1 text-sm text-surface transition duration-300 hover:bg-indigo-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
