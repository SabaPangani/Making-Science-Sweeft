import { useEffect, useState } from "react";
import Search from "../components/Search";
import { ImageComponent } from "../components/ImageComponent";
import DetailsModal from "../components/DetailsModal";
import { useModal } from "../store/modalContext";
import { Image as ImageType } from "../types/Image";
import { useImageData } from "../hooks/useImageData";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import ScrollUp from "../components/ScrollUp";

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

        <ul className="flex flex-row flex-wrap gap-5 gap-y-16 items-center justify-center">
          {/* I used ternary operator at first but then it gave me weird data render flickers so i used this approach */}
          {filteredData.length >= 1 &&
            filteredData.map((image: ImageType) => (
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

          {!filteredData.length &&
            images.map((image: ImageType) => (
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

          {isLoading && <h1>Loading...</h1>}
        </ul>

        {selectedImage && isModalOpen && <DetailsModal image={selectedImage} />}
      </div>

      <ScrollUp />
    </>
  );
}
