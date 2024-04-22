import React from "react";
import MobileSidebar from "./mobilesidebar";

const MobileHeader = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center border-b bg-green-500 px-6 lg:hidden">
      <MobileSidebar />
    </nav>
  );
};

export default MobileHeader;
