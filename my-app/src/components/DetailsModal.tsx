import { useModal } from "../store/modalContext";
import CloseSvg from "./svgs/CloseSvg";

export default function DetailsModal({
  downloads,
  likes,
  views,
}: {
  downloads: number;
  likes: number;
  views: number;
}) {
  const { setIsModalOpen } = useModal()!;
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] h-[500px] p-10 flex flex-col items-center justify-center rounded-md shadow-2xl">
      <div
        className="absolute top-10 right-10"
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <CloseSvg />
      </div>
      <ul className="flex flex-col items-center gap-y-5">
        <li>Downloads {downloads}</li>
        <li>Likes {likes}</li>
        <li>Views {views}</li>
      </ul>
    </div>
  );
}
