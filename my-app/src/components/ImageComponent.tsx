import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
export const ImageComponent = ({
  src,
  alt,
  blurHash,
  ...props
}: {
  src: string;
  alt: string;
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
      {!imgLoaded ? (
        <Blurhash
          hash={blurHash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      ) : (
        <img
          className="w-[300px] h-[300px] rounded-xl cursor-pointer"
          src={src}
          alt={alt}
          loading="lazy"
          {...props}
        />
      )}
    </>
  );
};
