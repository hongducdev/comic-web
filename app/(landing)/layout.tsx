import Navigation from "@/components/shared/Navigation/Navigation";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default LandingLayout;
