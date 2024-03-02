import { useEffect, useState } from "react";
import HistoryImages from "../components/HistoryImages";
import { useModal } from "../store/modalContext";

export default function History() {
  const [history, setHistory] = useState() as any[];
  const [selectedHistory, setSelectedHistory] = useState("");
  const { isHistModalOpen, setIsHistModalOpen } = useModal()!;
  useEffect(() => {
    if (localStorage.getItem("history")) {
      setHistory(JSON.parse(localStorage.getItem("history")!));
    }
  }, []);

  const handleHistorySelect = (name: string) => {
    setSelectedHistory(name);
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-5xl font-medium my-5">ისტორია</h1>

      <ul className="flex flex-col gap-y-2 mx-auto">
        {history?.map((hist: string, index: number) => (
          <li
            className="font-medium text-2xl cursor-pointer"
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
