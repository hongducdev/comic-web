import Navigation from "@/components/shared/Navigation/Navigation";
import ScrollToTop from "@/components/shared/ScrollToTop";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Navigation />
      <div className="max-w-[1280px] mx-auto px-3 lg:px-0">{children}</div>
      <ScrollToTop />
    </div>
  );
};

export default LandingLayout;
