import { ChangeEvent, useEffect, useState } from "react";
import { Image } from "../types/Image";

export function useImageSearch(updateFilteredData: any) {
  const [text, setText] = useState("");
  const [page, setPage] = useState<{ page: number; fetch: string }>({
    page: 1,
    fetch: "GET",
  });
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toLocaleLowerCase());
  };

  const handleHistory = () => {
    let history: string | string[] = sessionStorage.getItem("history")!;
    if (history) {
      history = JSON.parse(history);
    } else {
      history = [];
    }

    (history as string[]).push(text);

    sessionStorage.setItem("history", JSON.stringify(history));
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (text.trim() === "") {
        updateFilteredData([]);
        return;
      }

      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${page.page}&query=${text}&per_page=20&client_id=${process.env.REACT_APP_CLIENT_ID}`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error("Failed to search images " + JSON.stringify(json));
      }

      if (json.results && json.results.length > 0) {
        if (page.page > 1) {
          updateFilteredData((prevData: Image[]) => [
            ...prevData,
            ...json.results,
          ]);
        } else {
          updateFilteredData(json.results);
        }

        let cachedData = sessionStorage.getItem("cache");
        let _parsedData: {
          [key: string]: { images: Image[]; nextPage: number };
        } = JSON.parse(cachedData || "{}");

        const updatedCache = { ..._parsedData };
        updatedCache[text] = {
          images: updatedCache[text]
            ? [...updatedCache[text].images, ...json.results]
            : json.results,
          nextPage: page.page + 1,
        };

        sessionStorage.setItem("cache", JSON.stringify(updatedCache));
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

    let parsedData: { [key: string]: { images: Image[]; nextPage: number } } =
      {};
    let cachedData = sessionStorage.getItem("cache");
    if (cachedData) {
      parsedData = JSON.parse(cachedData);
      if (cachedData !== null && parsedData[text]) {
        updateFilteredData(parsedData[text].images);
        setPage({ page: parsedData[text].nextPage, fetch: "cache" });
        setIsLoading(false);
        return;
      }
    }

    fetchData();
    setIsLoading(false);
  };

  useEffect(() => {
    if (page.fetch !== "cache") {
      fetchData();
    }
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
