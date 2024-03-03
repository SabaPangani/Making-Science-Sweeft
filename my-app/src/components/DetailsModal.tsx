import { useEffect, useState } from "react";
import { useModal } from "../store/modalContext";
import { Image } from "../types/Image";
import { ImageComponent } from "./ImageComponent";
import CloseSvg from "./svgs/CloseSvg";
import DownloadSvg from "./svgs/DownloadSvg";
import LikeSvg from "./svgs/LikeSvg";
import ViewSvg from "./svgs/ViewSvg";

interface ImageStats {
  downloads: { total: number };
  likes: { total: number };
  views: { total: number };
}
export default function DetailsModal({ image }: { image: Image }) {
  const { setIsModalOpen } = useModal()!;
  const [imageStats, setImageStats] = useState<ImageStats>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const cachedData = sessionStorage.getItem(`imageStats_${image.id}`);
        if (cachedData) {
          setImageStats(JSON.parse(cachedData));
        } else {
          const res = await fetch(
            `https://api.unsplash.com/photos/${image.id}/statistics/?client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M`
          );

          if (!res.ok) {
            throw new Error("Failed to get image statistics");
          }

          const json = await res.json();
          setImageStats(json);

          sessionStorage.setItem(
            `imageStats_${image.id}`,
            JSON.stringify(json)
          );
        }
      } catch (error) {
        console.error("Error fetching image statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [image]);

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[1300px] h-[700px] max-[425px]:h-[400px] p-10 rounded-md shadow-2xl">
      <div
        className="absolute top-10 right-10 max-[425px]:top-5 max-[425px]:right-5"
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <CloseSvg />
      </div>
      <div className="h-full flex flex-col items-center justify-between gap-y-5 py-10 max-[425px]:py-0">
        <ImageComponent
          src={image.urls.regular}
          alt={image.slug}
          blurHash={image.blur_hash}
          w="600px"
          h="100%"
        />
        <ul className="flex flex-row w-full items-center justify-center gap-x-3 ">
          <li className="font-medium flex flex-row items-center gap-x-2">
            <DownloadSvg />{" "}
            <span className="max-[425px]:hidden">Downloads:</span>{" "}
            {isLoading ? <span>Loading...</span> : imageStats?.downloads.total}
          </li>
          <li className="font-medium flex flex-row items-center gap-x-2">
            <LikeSvg /> <span className="max-[425px]:hidden">Likes:</span>{" "}
            {isLoading ? <span>Loading...</span> : image.likes}{" "}
            {/* Used image.likes because api was fetching value of likes as 0 */}
          </li>
          <li className="font-medium flex flex-row items-center gap-x-2">
            <ViewSvg /> <span className="max-[425px]:hidden">Views:</span>{" "}
            {isLoading ? <span>Loading...</span> : imageStats?.views.total}
          </li>
        </ul>
      </div>
    </div>
  );
}
