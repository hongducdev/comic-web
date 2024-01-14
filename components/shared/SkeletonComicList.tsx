import SkeletonComicCard from "./SkeletonComicCard";

const SkeletonComicList = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
      {Array.from(Array(10).keys()).map((index) => (
        <SkeletonComicCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonComicList;
