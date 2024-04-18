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
      className={`flex bg-white h-full lg:!w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col ${className}`}
    >
      <div>
        <Link
          href={"/"}
          className="pt-8 pl-4 pb-7 flex items-center gap-x-3 cursor-pointer"
        >
          <Image src="/mascot.svg" alt="mascot" height={40} width={40} />
          <h1 className="text-2xl text-green-600 tracking-wide font-bold">
            Duolingo
          </h1>
        </Link>
      </div>
      <div className="flex flex-col gap-y-2 flex-1 ">
        <SidebarItem label="Learn" href={"/learn"} iconSrc="/learn.svg" />
        <SidebarItem
          label="Leaderboard"
          href={"/leaderboard"}
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Quests" href={"/quests"} iconSrc="/quests.svg" />
        <SidebarItem label="Shop" href={"/shop"} iconSrc="/shop.svg" />
      </div>
      <div className="p-4">
        <div className="w-[48px] h-[48px] rounded-full bg-green-400 align-component-center">
          <span>User</span>
        </div>
      </div>
    </div>
  );
};
