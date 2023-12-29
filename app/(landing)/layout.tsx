import Navigation from "@/components/shared/Navigation/Navigation";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="max-w-[1280px] mx-auto px-3 lg:px-0">{children}</div>
    </div>
  );
};

export default LandingLayout;
