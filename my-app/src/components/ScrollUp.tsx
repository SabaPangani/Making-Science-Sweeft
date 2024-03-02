import React from "react";
import ArrowUp from "./svgs/ArrowUp";

export default function ScrollUp() {
  return (
    <div
      className="fixed right-10 bottom-10 bg-white rounded-xl w-12 h-12 flex items-center justify-center animate-bounce cursor-pointer"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <ArrowUp />
    </div>
  );
}
