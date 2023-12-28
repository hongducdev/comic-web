import Navigation from "@/components/shared/Navigation/Navigation";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="max-w-[1280px] mx-auto">{children}</div>
    </div>
  );
};

export default LandingLayout;
