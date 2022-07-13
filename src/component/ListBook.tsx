import { useState, useEffect } from "react";
import { IDataBooks, IListBook } from "../utils/Interface";
import Book from "./Book";

export default function ListBook({ data, loading }: IListBook) {
  const [bookmark, setBookmark] = useState(JSON.parse(localStorage.getItem("bookmark")||"[]"));

  const handleBookmark = (item:IDataBooks) => {
    const arr = [...bookmark];
    if (bookmark.some((value:IDataBooks) => value.id == item.id)) {
      setBookmark(bookmark.filter((val:IDataBooks) => val.id != item.id));
    } else {
      arr.push(item);
      setBookmark(arr);
    }
  };
  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }, [bookmark]);

  return (
    <div className="grid grid-cols-2 gap-10 py-2 md:grid-cols-3 lg:py-8 xl:grid-cols-4">
      {!loading ? (
        data.length > 0 ? (
          data.map((item) => (
            <Book
              data={item}
              bookmark={bookmark}
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
