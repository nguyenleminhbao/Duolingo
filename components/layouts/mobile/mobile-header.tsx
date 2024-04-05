"use client";

import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <div className="lg:hidden px-6 h-[50px] flex items-center bg-yellow-400 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </div>
  );
};
