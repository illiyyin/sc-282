import { useState, useEffect } from "react";
import { IDataBooks, IDetailBooks } from "../utils/Interface";
import { useLocation } from "react-router-dom";
import Heart from "./Heart";

export default function Book({ data, bookmark, setBookMark }: IDetailBooks) {
  const location = useLocation();
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (
      bookmark.some(
        (item: IDataBooks) => item.id == data.id && item.title == data.title
      )
    )
      setSelected(true);
  }, [location, bookmark]);

  const handleBookmark = (item: IDataBooks) => {
    setSelected(!selected);
    setBookMark(item);
  };
  return (
    <div className="group cursor-pointer ">
      <div className="relative">
        <div
          onClick={() => handleBookmark(data)}
          className="absolute bottom-4 right-4 z-20 flex h-12 w-12 items-center rounded-full bg-slate-100 transition-all hover:bg-slate-200 group-hover:-translate-y-2"
        >
          <div className="flex w-full flex-col items-center">
            <Heart
              fill={selected == true ? "#EB2F5D" : "none"}
              outline="#BB123B"
            />
          </div>
        </div>
        <img
          src={data.cover_url}
          className="transition-all group-hover:-translate-y-2 group-hover:shadow-lg"
        />
      </div>
      <h4 className="mt-2 text-ellipsis text-xl font-bold">{data.title}</h4>
      <h6 className="font-semibold text-gray-400">
        <i>by {data.authors[0]}</i>
      </h6>
    </div>
  );
}
