"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { refillHearts } from "@/actions/user-progress";
import { toast } from "sonner";
import { createStripUrl } from "@/actions/user-subscription";
import { POINTS_TO_REFILL } from "@/constants";

type Props = {
  points: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

const Items = ({ points, hearts, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }
    startTransition(() => {
      refillHearts().catch(() => toast.error("Something Went Wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went Wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base text-neutral-700 lg:text-xl">Refill Hearts</p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base text-neutral-700 lg:text-xl">Unlimited</p>
        </div>
        <Button disabled={pending} onClick={onUpgrade}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
