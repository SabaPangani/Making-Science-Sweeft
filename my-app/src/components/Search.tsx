import { ChangeEvent, useEffect, useState } from "react";

export default function Search({
  images,
  setImages,
  setFilteredData,
  setIsLoading,
}: {
  images: any[];
  setImages: (images: any) => void;
  setFilteredData: (images: any) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const [text, setText] = useState("");
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toLocaleLowerCase());
  };

  const handleSearch = async () => {
    setIsLoading(true);

    let history: any = localStorage.getItem("history");
    if (history) {
      history = JSON.parse(history);
    } else {
      history = [];
    }

    history.push(text);

    localStorage.setItem("history", JSON.stringify(history));

    let cachedData: any = localStorage.getItem("cache");
    if (cachedData) {
      cachedData = JSON.parse(cachedData);
      if (cachedData !== null) {
        if (cachedData[text]) {
          console.log("Cached");
          setFilteredData(cachedData[text]);
          setIsLoading(false);
          return;
        }
      }
    }

    fetchData(cachedData);

    setIsLoading(false);
  };

  const fetchData = async (cachedData: any) => {
    try {
      if (text.trim() === "") {
        setFilteredData([]);
        return;
      }
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${text}&per_page=10&client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error("Failed to search images ", json);
      }

      const updatedCache = { ...cachedData, [text]: json.results };
      localStorage.setItem("cache", JSON.stringify(updatedCache));

      setFilteredData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 mb-5">
      <label htmlFor="search" className="font-medium">
        Search images
      </label>
      <div>
        <input
          className="w-[190px] px-4 py-2 rounded-md border-2 bg-[#FFF] border-zinc-300 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] focus:border-purple outline-none transition-all"
          type="search"
          id="search"
          placeholder="e.g orange leaf trees"
          onChange={handleChange}
        />
        <button
          className="ml-1 px-4 py-2 rounded-md border-2 bg-[#FFF] border-zinc-300 hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] hover:bg-purple-hover transition-all  cursor pointer font-medium"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
