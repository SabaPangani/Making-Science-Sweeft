import React, { useEffect, useState } from "react";
import { ImageComponent } from "./ImageComponent";

export default function HistoryImages({ name }: { name: string }) {
  const [images, setImages] = useState() as any[];
  useEffect(() => {
    let cachedData: any = localStorage.getItem("cache");
    if (cachedData) {
      cachedData = JSON.parse(cachedData);
      if (cachedData !== null) {
        if (cachedData[name]) {
          setImages(cachedData[name]);
          console.log("Cached");
          return;
        }
      }
    }
  }, []);
  return (
    <>
      <div className="bg-black opacity-15 absolute w-screen h-screen top-0"></div>
      <ul className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ul className="flex flex-row flex-wrap gap-5 items-center">
          {images &&
            images.map((image: any) => (
              <li key={image.id}>
                <ImageComponent
                  src={image.urls.raw}
                  alt={image.slug}
                  blurHash={image.blur_hash}
                />
              </li>
            ))}
        </ul>
      </ul>
    </>
  );
}
