import { useState, useEffect } from "react";
import { Image } from "../types/Image";

export function useImageData(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [filteredData, setFilteredData] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const url =
          `https://api.unsplash.com/photos/?client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M&per_page=22&page=${page}&order_by=popular&w=600&h=600`;
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch images " + JSON.stringify(json));
        }

        // if (text.trim() === "") {
        if (page > 1) {
          setImages((prev) => [...prev, ...json]);
        } else {
          setImages(json);
        }
        localStorage.setItem("images", JSON.stringify({ images: json }));

        setHasMore(json.length > 0);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [ page]);

  return {
    page,
    setPage,
    isLoading,
    images,
    filteredData,
    setFilteredData,
    hasMore,
  };
}
