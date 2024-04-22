import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebaritem";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

const sideBarItemProps = [
  {
    label: "Learn",
    iconSrc: "/learn.svg",
    href: "/learn",
  },
  {
    label: "Leader Board",
    iconSrc: "/leaderboard.svg",
    href: "/learnboard",
  },
  {
    label: "Quests",
    iconSrc: "/quests.svg",
    href: "/quests",
  },
  {
    label: "Shop",
    iconSrc: "/shop.svg",
    href: "/shop",
  },
];

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col  border-r-2 bg-white px-4 lg:fixed lg:w-[256px]",
        className,
      )}
    >
      <div className=" flex items-center justify-start gap-2 py-4 lg:px-3">
        <Link href="/learn">
          <Image
            src="./mascot.svg"
            width={40}
            height={40}
            alt="duolingo-logo"
          />
        </Link>
        <p>Lingo</p>
      </div>
      <div className="flex flex-1 flex-col gap-y-4 py-6">
        {sideBarItemProps.map((item, index) => {
          return (
            <SidebarItem
              label={item.label}
              iconSrc={item.iconSrc}
              href={item.href}
              key={index}
            />
          );
        })}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground " />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            showName={true}
            afterSignOutUrl="/"
            userProfileMode="modal"
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
