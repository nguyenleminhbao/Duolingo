"use client";

import { Button, Loading } from "@/components/ui";
import { POINTS_TO_REFILL } from "@/constants/data";
import useAsync from "@/hooks/use-async";
import { IUserProgress } from "@/interfaces/user-progress";
import { refillHearts } from "@/services/user-progress/get";
import { createOrder } from "@/services/zalopay/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;

  run: (
    callback?: ((..._: any) => Promise<IUserProgress | undefined>) | undefined
  ) => Promise<unknown>;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
  run,
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts == 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .then(() => {
          toast.success("Hearts refilled successfully");
          run();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = async () => {
    startTransition(() => {
      createOrder().then((orderZaloPay) => {
        if (orderZaloPay) {
          router.push(orderZaloPay?.order_url);
        }
      });
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
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
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button
          onClick={onUpgrade}
          disabled={pending}
          className=" cursor-pointer"
        >
          {false ? <Loading /> : hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
};
