"use client";

import useExitModal from "@/zustand/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_sad.svg" alt="Mascot" height={80} width={80} />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center text-base font-bold">
          {`Wait, don't go!`}
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          {`You're about to leave the lesson. Are you sure?`}
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full cursor-pointer"
              size="lg"
              onClick={close}
            >
              KEEP LEARNING
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full cursor-pointer"
              size="lg"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              END SESSION
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
