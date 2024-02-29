import { useEffect, useState } from "react";
import Search from "../components/Search";

const clientId = process.env.CLIENT_ID;
const Image = ({ src, alt, ...props }: { src: string; alt: string }) => {
  return (
    <img
      className="w-[300px] h-[300px] rounded-xl cursor-pointer"
      src={src}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

export default function Main() {
  const [images, setImages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
              <li key={image.id}>
                <Image src={image.urls.raw} alt={image.slug} />
              </li>
            ))
          : images.map((image: any) => (
              <li key={image.id}>
                <Image src={image.urls.raw} alt={image.slug} />
              </li>
            ))}
      </ul>
    </div>
  );
}
