import React, { useEffect, useState } from "react";
import { ImageComponent } from "./ImageComponent";
import { Image } from "../types/Image";
import { useInfiniteScroll } from "../useInfiniteScroll";

interface CachedData {
  [key: string]: Image[] | undefined;
}

export default function HistoryImages({ name }: { name: string }) {
  const [images, setImages] = useState<Image[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(20);

  useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  useEffect(() => {
    let cachedData = localStorage.getItem("cache");
    if (cachedData) {
      const parsedData: { [key: string]: Image[] } = JSON.parse(cachedData);
      if (parsedData && parsedData[name]) {
        const twentyImages = parsedData[name].slice(left, right);
        setImages((prevImages) => [...prevImages, ...twentyImages]);
        setLeft(right);
        setRight((prev) => prev * 2);
        console.log("Cached");
      }
    }
  }, [page]);

  return (
    <>
      <div className="bg-black opacity-15 absolute w-screen h-screen top-0"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ul className="flex flex-row flex-wrap gap-5 items-center">
          {images &&
            images.map((image: Image) => (
              <li key={image.id}>
                <ImageComponent
                  src={image.urls.regular}
                  alt={image.slug}
                  blurHash={image.blur_hash}
                  w="300px"
                  h="300px"
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
