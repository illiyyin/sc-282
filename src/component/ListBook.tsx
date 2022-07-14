import { useState, useEffect } from "react";
import { IDataBooks, IListBook } from "../utils/Interface";
import Book from "./Book";

export default function ListBook({
  data,
  loading,
  isDataFound,
  bookmarkData,
  setBookmarkData,
  bookmarkPage,
}: IListBook) {
  const handleBookmark = (item: IDataBooks) => {
    const arr = [...bookmarkData];
    if (bookmarkData.some((value: IDataBooks) => value.id == item.id)) {
      setBookmarkData(
        bookmarkData.filter((val: IDataBooks) => val.id != item.id)
      );
    } else {
      arr.push(item);
      setBookmarkData(arr);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmarkData));
  }, [bookmarkData]);

  return (
    <div className="grid grid-cols-2 gap-10 py-2 md:grid-cols-3 lg:py-8 xl:grid-cols-4">
      {bookmarkPage ? (
        bookmarkData.length > 0 ? (
          bookmarkData.map((item) => (
            <Book
              key={item.id}
              data={item}
              bookmark={bookmarkData}
              setBookMark={handleBookmark}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <h3>You dont have bookmark</h3>
          </div>
        )
      ) : !loading ? (
        isDataFound ? (
          data?.map((item) => (
            <Book
              key={item.id}
              data={item}
              bookmark={bookmarkData}
              setBookMark={handleBookmark}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            Data Not Found
          </div>
        )
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4">Loading...</div>
      )}
    </div>
  );
}
