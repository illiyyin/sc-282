import { useState, useEffect } from "react";
import SearchInput from "./component/SearchInput";

function App() {
  const [count, setCount] = useState(0);
  const [listData, setListData] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    getListCategory();
  }, []);

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

  return (
    <div className="mx-auto my-8 flex w-full max-w-screen-xl flex-col items-center text-center selection:bg-green-900">
      {listCategory?.map(item => (
        <div>{item.name}</div>
      ))}
      <SearchInput />
    </div>
  );
}

export default App;
