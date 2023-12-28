import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex item-center justify-center">
      <div className="w-10 h-10 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default Loading;
