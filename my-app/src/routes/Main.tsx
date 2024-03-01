import { useEffect, useState } from "react";
import Search from "../components/Search";
import { ImageComponent } from "../components/ImageComponent";
import DetailsModal from "../components/DetailsModal";
import { useModal } from "../store/modalContext";
const clientId = process.env.CLIENT_ID;

export default function Main() {
  const [images, setImages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState() as any;
  const { isModalOpen, setIsModalOpen } = useModal()!;
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const storedImages = localStorage.getItem("images");
        if (storedImages) {
          const { images: imgs } = JSON.parse(storedImages);
          setImages(imgs);
        } else {
          const res = await fetch(
            `https://api.unsplash.com/photos/?client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M&per_page=20&order_by=popular`
          );
          const json = await res.json();
          setImages(json);
          localStorage.setItem("images", JSON.stringify({ images: json }));
          if (!res.ok) {
            throw new Error("Failed to fetch images", json);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  return (
    <div className=" my-10 px-10">
      <Search
        images={images}
        setImages={setImages}
        setFilteredData={setFilteredData}
        setIsLoading={setIsLoading}
      />
      <ul className="flex flex-row flex-wrap gap-5 items-center">
        {filteredData.length
          ? filteredData.map((image: any) => (
              <li
                key={image.id}
                onClick={() => {
                  handleImageSelect(image);
                }}
              >
                <ImageComponent
                  src={image.urls.raw}
                  alt={image.slug}
                  blurHash={image.blur_hash}
                />
              </li>
            ))
          : images.map((image: any) => (
              <li
                key={image.id}
                onClick={() => {
                  handleImageSelect(image);
                }}
              >
                <ImageComponent
                  src={image.urls.raw}
                  alt={image.slug}
                  blurHash={image.blur_hash}
                />
              </li>
            ))}
      </ul>

      {selectedImage && isModalOpen && (
        <DetailsModal downloads={20} likes={20} views={20} />
      )}
    </div>
  );
}
