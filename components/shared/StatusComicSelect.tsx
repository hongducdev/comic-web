import { statusComic } from "@/utils/statusComic";
import React from "react";

interface StatusComicSelectProps {
  selectedStatus: "all" | "ongoing" | "completed";
  setSelectedStatus: React.Dispatch<
    React.SetStateAction<"all" | "ongoing" | "completed">
  >;
}

const StatusComicSelect: React.FC<StatusComicSelectProps> = ({
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex items-center gap-3 mt-5">
      {statusComic.map((status) => (
        <div
          className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
            status.id === selectedStatus
              ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
              : "bg-neutral-100 dark:bg-neutral-800"
          }`}
          key={status.id}
          onClick={() =>
            setSelectedStatus(status.id as "all" | "ongoing" | "completed")
          }
        >
          {status.name}
        </div>
      ))}
    </div>
  );
};

export default StatusComicSelect;
