import { useImageSearch } from "../hooks/useImageSearch";
import { Image } from "../types/Image";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function Search({
  updateFilteredData,
}: {
  updateFilteredData: (images: Image[]) => void;
}) {
  const { text, handleChange, handleSearch, isLoading, setPage, hasMore } =
    useImageSearch(updateFilteredData);

  useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => ({ page: prevPage.page + 1, fetch: "get" }));
    }
  });

  return (
    <div className="flex flex-col items-center gap-y-2 mb-5">
      <label htmlFor="search" className="font-medium text-dark">
        Search images
      </label>
      <div>
        <input
          className="w-[190px] px-4 py-2 rounded-md border-2 bg-[#FFF] border-zinc-300 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] focus:border-purple outline-none transition-all"
          type="search"
          id="search"
          placeholder="e.g orange leaf trees"
          value={text}
          onChange={handleChange}
        />
        <button
          className="ml-1 px-4 py-2 rounded-md border-2 bg-[#FFF] border-zinc-300 hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] hover:bg-purple-hover transition-all  cursor pointer font-medium"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
