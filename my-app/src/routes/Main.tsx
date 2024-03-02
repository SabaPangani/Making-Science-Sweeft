import { useEffect, useState } from "react";
import Search from "../components/Search";
import { ImageComponent } from "../components/ImageComponent";
import DetailsModal from "../components/DetailsModal";
import { useModal } from "../store/modalContext";
import { Image as ImageType } from "../types/Image";
import { useImageData } from "../hooks/useImageData"; 
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function Main() {
  const { images, filteredData, isLoading, setPage, setFilteredData, hasMore } =
    useImageData();

  const { isModalOpen, setIsModalOpen } = useModal()!;
  const [selectedImage, setSelectedImage] = useState<ImageType>();

  const handleImageSelect = (image: ImageType) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  const updateFilteredData = (data: ImageType[]) => {
    setFilteredData(data);
  };
  return (
    <>
      <div className="my-10 px-10 max-[360px]:px-5">
        <Search updateFilteredData={updateFilteredData} />

        <ul className="flex flex-row flex-wrap gap-5 gap-y-10 items-center justify-center">
          {filteredData.length
            ? filteredData.map((image: ImageType) => (
                <li
                  key={image?.id}
                  onClick={() => {
                    handleImageSelect(image);
                  }}
                >
                  <ImageComponent
                    src={image?.urls.regular}
                    alt={image?.slug}
                    blurHash={image?.blur_hash}
                    w="300px"
                    h="300px"
                  />
                </li>
              ))
            : images.map((image: ImageType) => (
                <li
                  key={image?.id}
                  onClick={() => {
                    handleImageSelect(image);
                  }}
                >
                  <ImageComponent
                    src={image?.urls.regular}
                    alt={image?.slug}
                    blurHash={image?.blur_hash}
                    w="300px"
                    h="300px"
                  />
                </li>
              ))}
        </ul>

        {selectedImage && isModalOpen && <DetailsModal image={selectedImage} />}
      </div>

      <div
        className="fixed right-10 bottom-10 bg-white rounded-full w-20 h-20 flex items-center justify-center animate-bounce cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        UP
      </div>
    </>
  );
}
