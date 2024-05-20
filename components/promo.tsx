"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Promo = () => {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="Unlimited" height={26} width={26} />
          <h3 className="text-lg font-bold">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get Unlimited Hearts and More</p>
      </div>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="w-full hover:bg-green-300"
      >
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </div>
  );
};

export default Promo;
