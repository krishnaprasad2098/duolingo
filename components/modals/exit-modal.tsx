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
import { useExitModel } from "@/store/use-exit-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModel();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_sad.svg" alt="Mascot" width={80} height={80} />
          </div>
          <DialogTitle className="text-2xls text-center font-bold">
            Wait,don&apos;t go!!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson,Are you sure ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="default"
              className="w-full"
              size="default"
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              size="default"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
