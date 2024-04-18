"use client";

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
import useHeartModal from "@/zustand/use-heart-modal";

export const HeartModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useHeartModal();

  const onClick = () => {
    close();
    router.push("/store");
  };

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/mascot_bad.svg" alt="Mascot" height={80} width={80} />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center text-base font-bold">
          You ran out of hearts!
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          Get Pro for unlimited hearts, or purchase them in store.
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full cursor-pointer"
              size="lg"
              onClick={onClick}
            >
              GET UNLIMITED HEARTS
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full cursor-pointer"
              size="lg"
              onClick={() => close()}
            >
              NO THANKS
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
