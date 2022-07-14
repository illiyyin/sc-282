import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Nav() {
  const [left, setLeft] = useState<number | undefined>(undefined);
  const location = useLocation();
  const listRef = useRef<HTMLDivElement | null>(null);
  const bookmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location.pathname == "/") setLeft(listRef.current?.offsetLeft);
    if (location.pathname == "/bookmark")
      setLeft(bookmarkRef.current?.offsetLeft);
  }, [location]);

  return (
    <div className="relative mb-8 flex w-full  rounded-full bg-blue-100 py-4">
      <div
        style={{ left: left }}
        className="absolute top-1/2 ml-2 h-[calc(100%-1rem)] w-[calc(50%-1rem)] -translate-y-1/2 rounded-full bg-blue-500 transition-all ease-out"
      ></div>
      <div
        className={`relative w-full text-3xl font-bold ${
          location.pathname == "/" ? "text-white":"text-blue-700"
        }`}
        // onClick={() => setLeft(listRef.current?.offsetLeft)}
        ref={(ref) => (listRef.current = ref)}
      >
        <Link to="/">
          <p>List Book</p>
        </Link>
      </div>
      <div
        className={`relative w-full text-3xl font-bold ${
          location.pathname == "/bookmark" ? "text-white":"text-blue-700"
        }`}
        // onClick={() => setLeft(bookmarkRef.current?.offsetLeft)}
        ref={bookmarkRef}
      >
        <Link to="/bookmark">
          <p>Bookmark</p>
        </Link>
      </div>
    </div>
  );
}
