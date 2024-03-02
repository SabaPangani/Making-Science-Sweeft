import { useEffect, useState } from "react";
import { ImageComponent } from "./ImageComponent";
import { Image } from "../types/Image";
import { useInfiniteScroll } from "../useInfiniteScroll";
import { useModal } from "../store/modalContext";
import DetailsModal from "./DetailsModal";
import ScrollUp from "./ScrollUp";

export default function HistoryImages({ name }: { name: string }) {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image>();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { setIsHistModalOpen, setIsModalOpen, isModalOpen } = useModal()!;

  useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  const handleImageSelect = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);

    console.log(isModalOpen, selectedImage);
  };
  useEffect(() => {
    let cachedData = localStorage.getItem("cache");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (parsedData && parsedData[name]) {
        const twentyImages = parsedData[name].slice(
          (page - 1) * 20,
          page * 20
        );
        setImages((prevImages) => {
          const newImages = twentyImages.filter(
            (image: Image) =>
              !prevImages.some((prevImage) => prevImage.id === image.id)
          );
          return [...prevImages, ...newImages];
        });
      }
    }
  }, [page]);

  return (
    <>
      <div
        className="bg-black opacity-15 fixed w-screen h-screen top-0"
        onClick={() => {
          setIsHistModalOpen(false);
        }}
      ></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[-500px] h-1/2 flex flex-row-reverse w-full max-w-[1100px]">
        <div
          className="bg-white h-[40px] font-medium rounded-md py-2 px-3 hover:text-red cursor-pointer"
          onClick={() => {
            setIsHistModalOpen(false);
          }}
        >
          Close
        </div>
        <ul className="flex flex-wrap gap-5 items-center justify-center pb-10">
          {images &&
            images.map((image: Image) => (
              <li
                key={image.id}
                onClick={() => {
                  handleImageSelect(image!);
                }}
                className="flex justify-center"
              >
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
      {selectedImage && isModalOpen && <DetailsModal image={selectedImage} />}
      <ScrollUp />
    </>
  );
}
