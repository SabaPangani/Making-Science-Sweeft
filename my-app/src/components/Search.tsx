import { ChangeEvent, useEffect, useState } from "react";
import { Image } from "../types/Image";
import { useInfiniteScroll } from "../useInfiniteScroll";

export default function Search({
  images,
  setImages,
  setFilteredData,
  setIsLoading,
  filteredData,
}: {
  images: Image[];
  setImages: (images: Image[]) => void;
  setFilteredData: (images: Image[]) => void;
  setIsLoading: (value: boolean) => void;
  filteredData: Image[];
}) {
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toLocaleLowerCase());
  };

  useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  useEffect(() => {
    fetchData({});
  }, [page]);
  const handleSearch = async () => {
    setIsLoading(true);

    let history: string | string[] = localStorage.getItem("history")!;
    if (history) {
      history = JSON.parse(history);
    } else {
      history = [];
    }

    (history as string[]).push(text);

    localStorage.setItem("history", JSON.stringify(history));

    let parsedData: { [key: string]: Image[] } = {};
    let cachedData = localStorage.getItem("cache");
    if (cachedData) {
      parsedData = JSON.parse(cachedData);
      if (cachedData !== null) {
        if (parsedData[text]) {
          console.log("Cached");
          setFilteredData(parsedData[text]);
          setIsLoading(false);
          return; 
        }
      }
    }

    fetchData(parsedData);

    setIsLoading(false);
  };

  const fetchData = async (parsedData: { [key: string]: Image[] }) => {
    try {
      if (text.trim() === "") {
        setFilteredData([]);
        return;
      }

      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${text}&per_page=22&client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error("Failed to search images " + JSON.stringify(json));
      }

      if (json.results && json.results.length > 0) {
        if (page > 1) {
          setFilteredData([...filteredData, ...json.results] as Image[]);
          console.log(page);
        } else {
          setImages(json.results);
        }
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      const updatedCache = { ...parsedData, [text]: filteredData };
      localStorage.setItem("cache", JSON.stringify(updatedCache));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-2 mb-5">
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
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
