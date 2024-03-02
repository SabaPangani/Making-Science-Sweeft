import { ChangeEvent, useEffect, useState } from "react";
import { Image } from "../types/Image";

export function useImageSearch(updateFilteredData: any) {
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toLocaleLowerCase());
  };

  const handleHistory = () => {
    let history: string | string[] = localStorage.getItem("history")!;
    if (history) {
      history = JSON.parse(history);
    } else {
      history = [];
    }

    (history as string[]).push(text);

    localStorage.setItem("history", JSON.stringify(history));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (text.trim() === "") {
        updateFilteredData([]);
        return;
      }

      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${text}&per_page=22&client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error("Failed to search images " + JSON.stringify(json));
      }

      console.log("fetched");
      if (json.results && json.results.length > 0) {
        if (page > 1) {
          updateFilteredData((prevData: Image[]) => [
            ...prevData,
            ...json.results,
          ]);
        } else {
          updateFilteredData(json.results);
        }

        let cachedData = localStorage.getItem("cache");
        let _parsedData: { [key: string]: Image[] } = JSON.parse(
          cachedData || "{}"
        );

        const updatedCache = { ..._parsedData };
        updatedCache[text] = updatedCache[text]
          ? [...updatedCache[text], ...json.results]
          : json.results;

        localStorage.setItem("cache", JSON.stringify(updatedCache));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    handleHistory();

    updateFilteredData([]);

    let parsedData: { [key: string]: Image[] } = {};
    let cachedData = localStorage.getItem("cache");
    if (cachedData) {
      parsedData = JSON.parse(cachedData);
      if (cachedData !== null && parsedData[text]) {
        updateFilteredData(parsedData[text]);
        setIsLoading(false);
        return;
      }
    }

    fetchData();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return {
    text,
    setPage,
    hasMore,
    handleChange,
    handleSearch,
    isLoading,
  };
}
