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
import { usePracticeModel } from "@/store/use-practice-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PracticeModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModel();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/heart.svg" alt="Heart" width={100} height={100} />
          </div>
          <DialogTitle className="text-2xls text-center font-bold">
            Practice Lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice lessons to regain hearts and points.You cannot loose
            hearts or points in practice lesson.
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
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeModal;
