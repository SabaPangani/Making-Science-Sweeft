import { ChangeEvent, useState } from "react";

export default function Search({
  images,
  setImages,
  setFilteredData,
  setIsLoading,
}: {
  images: any[];
  setImages: (images: any) => void;
  setFilteredData: (images: any) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${searchText}&per_page=3&client_id=RlRwYHlj04AIBopR0YCd41asfBz8P4tsCoheyhNJQ-M`
      );
      const json = await res.json();
      console.log(searchText); 
      if (!res.ok) {
        throw new Error("Failed to search images ", json);
      }
      const updatedImages = json.results;
      if (searchText.trim() === "") {
        setFilteredData([]);
      }
      setFilteredData(updatedImages);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-2 mb-5">
      <label htmlFor="search" className="font-medium">
        Search images
      </label>
      <input
        className="w-[190px] px-4 py-2 rounded-md border-2 bg-[#FFF] border-zinc-300 focus:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)] focus:border-purple outline-none transition-all"
        type="search"
        id="search"
        placeholder="e.g orange leaf trees"
        onChange={handleChange} // Just pass the handleChange function directly
      />
    </div>
  );
}
