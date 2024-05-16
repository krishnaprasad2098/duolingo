import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import React from "react";
import Card from "./card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  type: (typeof challenges.$inferSelect)["type"];
  disabled?: boolean;
};

const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, i) => {
        return (
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            shortcut={`${i + 1}`}
            selected={selectedOption === option.id}
            onClick={() => onSelect(option.id)}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
            status={status}
          />
        );
      })}
    </div>
  );
};

export default Challenge;
