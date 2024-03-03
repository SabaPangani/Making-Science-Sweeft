import { useEffect, useState } from "react";
import HistoryImages from "../components/HistoryImages";
import { useModal } from "../store/modalContext";

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState("");
  const { isHistModalOpen, setIsHistModalOpen } = useModal()!;
  useEffect(() => {
    if (sessionStorage.getItem("history")) {
      setHistory(
        JSON.parse(sessionStorage.getItem("history")!).filter(
          (history: string) => history !== ""
        )
      );
    }
  }, []);

  const handleHistorySelect = (name: string) => {
    setSelectedHistory(name);
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-dark text-5xl font-medium my-5">
        ისტორია
      </h1>

      <ul className="flex flex-col gap-y-2 mx-auto">
        {(history as string[]).map((hist: string, index: number) => (
          <li
            className="font-medium text-2xl cursor-pointer text-center border border-1 border-purple pt-1 pb-2 px-3 rounded-md hover:bg-purple-hover text-dark"
            key={index}
            onClick={() => {
              handleHistorySelect(hist);
              setIsHistModalOpen(true);
            }}
          >
            {hist}
          </li>
        ))}
      </ul>
      {selectedHistory && isHistModalOpen && (
        <HistoryImages name={selectedHistory} />
      )}
    </div>
  );
}
