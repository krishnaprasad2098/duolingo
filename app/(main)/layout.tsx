import MobileHeader from "@/components/mobileheader";
import Sidebar from "@/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[60px] lg:pl-[256px] lg:pt-0">
        <div className="h-full bg-red-500">{children}</div>
      </main>
    </>
  );
};

export default layout;
