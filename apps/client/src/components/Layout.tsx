import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  classes?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, classes }) => {
  return (
    <div className={`flex justify-center items-center min-h-screen ${classes}`}>
      {children}
    </div>
  );
};

export default Layout;
