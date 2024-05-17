"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModel } from "@/store/use-hearts-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModel();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_bad.svg" alt="Mascot" width={80} height={80} />
          </div>
          <DialogTitle className="text-2xls text-center font-bold">
            You ran out of hearts!!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts or purchase from store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="default"
              className="w-full"
              size="default"
              onClick={onClick}
            >
              Get unlimited hearts !!
            </Button>
            <Button
              variant="link"
              className="w-full"
              size="default"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
