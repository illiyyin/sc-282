import { useState } from "react";

import IconLeft from "../assets/chevron-left.svg";
import IconRight from "../assets/chevron-right.svg";
import IconFilter from "../assets/filter.svg";
import { IListCategory, ISearchInput } from "../utils/Interface";

export default function SearchInput({
  query,
  setQuery,
  size,
  setSize,
  page,
  setPage,
  setCategory,
  listCategory,
}: ISearchInput) {
  const [showListCategory, setOpenListCategory] = useState(false);
  const handleFilter = () => {
    setOpenListCategory(true);
  };

  const handleSelectCategory = (id: number) => {
    setCategory(id);
    setOpenListCategory(false);
  };
  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex w-full space-x-2">
        <input
          type="text"
          placeholder="Type the Book's title you want to read"
          className="w-full rounded-md border px-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="relative flex basis-60 items-center ">
          {showListCategory && (
            <>
              <div
                onClick={() => setOpenListCategory(false)}
                className="fixed left-0 top-0 h-screen w-screen "
              ></div>
              <div className="absolute bottom-0 right-0 z-10 -mb-2 w-[calc(100%+4rem)] translate-y-full space-y-1 rounded-md border bg-white p-1 shadow-xl ">
                {listCategory?.map((item: IListCategory) => (
                  <div
                    onClick={() => handleSelectCategory(item.id)}
                    className="cursor-pointer rounded py-2 pl-2 text-left hover:bg-blue-100"
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <button
            onClick={handleFilter}
            className="flex h-full w-full items-center rounded-md  bg-blue-900 font-semibold text-white hover:bg-blue-700 "
          >
            <div className="mx-auto flex items-center">
              <img
                src={IconFilter}
                alt="IconFilter"
                className="mr-2 h-5 invert"
              />
              Filter Category
            </div>
          </button>
        </div>
      </div>
      <div className="flex w-full justify-between space-x-2 px-4">
        <div className="flex items-center space-x-2">
          <p>Books per page : </p>

          <div className="flex">
            {[5, 10, 20].map((item) => (
              <div
                key={item}
                onClick={() => setSize(item)}
                className={`${
                  size == item && "bg-slate-200"
                } cursor-pointer border-r border-t border-b p-2 first:rounded-l-lg first:border-l last:rounded-r-lg hover:bg-slate-100`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            disabled={page == 0 ? true : false}
            className={`h-10 w-10 rounded-full border-2 border-slate-500 disabled:cursor-not-allowed ${
              page != 0 ? "hover:bg-slate-100" : "opacity-40"
            }`}
            onClick={() => {
              if (page > 0) setPage(page - 1);
            }}
          >
            <img src={IconLeft} alt="IconLeft" className="mx-auto" />
          </button>
          <button
            className="h-10 w-10 rounded-full border-2 border-slate-500 hover:bg-slate-100"
            onClick={() => setPage(page + 1)}
          >
            <img src={IconRight} alt="IconRight" className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
