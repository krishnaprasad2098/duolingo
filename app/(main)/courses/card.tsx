import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};
const Card = ({ title, id, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex h-full min-h-[217px]  cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="min-[24px] flex w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5 ">
            <Check className="h-4 w-4 stroke-[4] text-white" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-g border object-cover drop-shadow-md"
      />
      <p className="mt-3 text-center font-bold text-neutral-700">{title}</p>
    </div>
  );
};

export default Card;
