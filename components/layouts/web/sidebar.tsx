"use client";

import { SidebarItem } from "@/components/ui/sidebar-item";
import Image from "next/image";
import Link from "next/link";
type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={`flex bg-green-400 h-full lg:!w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col ${className}`}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" alt="mascot" height={40} width={40} />
          <h1 className="text-2xl text-green-600 tracking-wide font-bold">
            Duolingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="LEARN" href={"/learn"} />
      </div>
    </div>
  );
};
