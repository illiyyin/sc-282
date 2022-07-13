import { useState, useEffect } from "react";
import ListBook from "./component/ListBook";
import SearchInput from "./component/SearchInput";
import { IDataBooks } from "./utils/Interface";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);

  const [search, setSearch] = useState("");
  const [rawData, setRawData] = useState([]);
  const [listData, setListData] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    getListBook();
  }, [page, size, selectedCategory]);

  const getListCategory = async () => {
    try {
      const req = await fetch("/api/fee-assessment-categories", {
        method: "GET",
      });
      const data = await req.json();
      setListCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListBook = async () => {
    try {
      setIsLoading(true);
      const params = `categoryId=${selectedCategory}&page=${page}&size=${size}`;
      console.log(params);
      const req = await fetch("/api/fee-assessment-books?" + params, {
        method: "GET",
      });
      const res = await req.json();

      if (res.length == 0) setIsFound(false);

      if (res.length > 0) {
        setListData(res);
        setRawData(res);
        setIsFound(true);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search.length == 0) {
      setListData(rawData);
    } else {
      setListData(
        rawData.filter((item:IDataBooks) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <div className="px-2 mx-auto my-8 flex w-full max-w-screen-xl flex-col items-center text-center selection:bg-green-900 ">
      <SearchInput
        query={search}
        setQuery={setSearch}
        size={size}
        setSize={setSize}
        page={page}
        setPage={setPage}
        setCategory={setSelectedCategory}
        listCategory={listCategory}
      />
      <ListBook data={listData} loading={isLoading} />
    </div>
  );
}

export default App;
