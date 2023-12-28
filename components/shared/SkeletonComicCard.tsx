import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComicCard = () => {
  return (
    <div className="h-[368px] rounded-md w-full">
      <Skeleton className="w-full h-[200px] rounded-t-md sha" />
      <div className="p-2">
        <Skeleton className="w-1/2 h-4 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md mt-2" />
        <Skeleton className="w-3/4 h-4 rounded-md mt-2" />
        <Skeleton className="w-3/4 h-4 rounded-md mt-3" />
        <Skeleton className="w-1/2 h-4 rounded-md mt-2" />
      </div>
    </div>
  );
};

export default SkeletonComicCard;
