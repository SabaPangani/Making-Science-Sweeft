// import { useEffect, useState } from "react";
// import Search from "../components/Search";
// import { ImageComponent } from "../components/ImageComponent";
// import DetailsModal from "../components/DetailsModal";
// import { useModal } from "../store/modalContext";
// import { Image as ImageType } from "../types/Image";
// import { useInfiniteScroll } from "../useInfiniteScroll";

// const clientId = process.env.CLIENT_ID;

// export default function Main() {
//   const [images, setImages] = useState<ImageType[]>([]);
//   const [filteredData, setFilteredData] = useState<ImageType[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<ImageType>();
//   const { isModalOpen, setIsModalOpen } = useModal()!;
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

// useInfiniteScroll(() => {
//   if (hasMore) {
//     setPage((prevPage) => prevPage + 1);
//   }
// });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://api.unsplash.com/photos/?client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M&per_page=22&page=${page}&order_by=popular&w=600&h=600`
//         );
//         const json = await res.json();
//         if (json && Array.isArray(json) && json.length > 0) {
//           if (page > 1) {
//             setImages((prev) => [...prev, ...json]);
//           } else {
//             setImages(json);
//           }
//           localStorage.setItem("images", JSON.stringify({ images: json }));
//           setHasMore(true);
//         } else {
//           setHasMore(false);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, [page]);

//   const handleImageSelect = (image: ImageType) => {
//     setSelectedImage(image);
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <div className="my-10 px-10 max-[360px]:px-5">
//         <Search
//           images={images}
//           setImages={setImages}
//           setFilteredData={setFilteredData}
//           setIsLoading={setIsLoading}
//           filteredData={filteredData}
//         />
//         <ul className="flex flex-row flex-wrap gap-5 gap-y-10 items-center justify-center">
//           {filteredData.length
//             ? filteredData.map((image: ImageType) => (
//                 <li
//                   key={image.id}
//                   onClick={() => {
//                     handleImageSelect(image);
//                   }}
//                 >
//                   <ImageComponent
//                     src={image.urls.regular}
//                     alt={image.slug}
//                     blurHash={image.blur_hash}
//                     w="300px"
//                     h="300px"
//                   />
//                 </li>
//               ))
//             : images.map((image: ImageType) => (
//                 <li
//                   key={image.id}
//                   onClick={() => {
//                     handleImageSelect(image);
//                   }}
//                 >
//                   <ImageComponent
//                     src={image.urls.regular}
//                     alt={image.slug}
//                     blurHash={image.blur_hash}
//                     w="300px"
//                     h="300px"
//                   />
//                 </li>
//               ))}
//         </ul>

//         {selectedImage && isModalOpen && <DetailsModal image={selectedImage} />}
//       </div>

//       <div
//         className="fixed right-10 bottom-10 bg-white rounded-full w-20 h-20 flex items-center justify-center animate-bounce cursor-pointer"
//         onClick={() => {
//           window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//         }}
//       >
//         UP
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Search from "../components/Search";
import { ImageComponent } from "../components/ImageComponent";
import DetailsModal from "../components/DetailsModal";
import { useModal } from "../store/modalContext";
import { Image as ImageType } from "../types/Image";
import { useImageData } from "../hooks/useImageData"; // Import the custom hook
import { useInfiniteScroll } from "../useInfiniteScroll";

export default function Main() {
  const { images, filteredData, isLoading, setPage, setFilteredData, hasMore } =
    useImageData();

  const { isModalOpen, setIsModalOpen } = useModal()!;
  const [selectedImage, setSelectedImage] = useState<ImageType>();

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);
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
