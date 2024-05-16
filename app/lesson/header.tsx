import { Progress } from "@/components/ui/progress";
import { InfinityIcon, X } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useExitModel } from "@/store/use-exit-modal";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModel();
  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px] ">
      <X
        onClick={open}
        className="cursor-pointer text-slate-500 transition hover:opacity-75 "
      />
      <Progress value={percentage} />
      <div className="flex items-center font-bold text-rose-500">
        <Image
          src="/heart.svg"
          width={28}
          height={28}
          alt="Hearts"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
