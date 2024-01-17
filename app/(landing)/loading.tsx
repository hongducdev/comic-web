const Loading = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center flex flex-col gap-5 items-center">
        <div className="w-10 h-10 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
        <span>Hi vọng không để bạn đợi lâu (～￣▽￣)～</span>
      </div>
    </div>
  );
};

export default Loading;
