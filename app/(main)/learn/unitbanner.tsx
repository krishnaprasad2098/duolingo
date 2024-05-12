import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          variant="secondary"
          size="lg"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
