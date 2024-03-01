import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
export const ImageComponent = ({
  src,
  alt,
  blurHash,
  w,
  h,
  ...props
}: {
  src: string;
  alt: string;
  w: string;
  h: string;
  blurHash: string;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgLoaded(true);
    };
    img.src = src;
  }, [src]);
  return (
    <>
      {!imgLoaded && blurHash?.length >= 6 ? (
        <Blurhash
          hash={blurHash}
          width={"300px"}
          height={"300px"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="rounded-md"
        />
      ) : (
        <img
          className={`rounded-xl cursor-pointer`}
          style={{ width: w, height: h }}
          src={src}
          alt="Unsplash image"
          loading="lazy"
          {...props}
        />
      )}
    </>
  );
};
