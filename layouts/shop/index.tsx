"use client";

import StickyWrapper from "@/components/layouts/web/sticky-wrapper";
import { FeedWrapper, UserProgress } from "@/components/ui";
import useAsync from "@/hooks/use-async";
import { getUserProgress } from "@/services/user-progress/get";
import Image from "next/image";
import { Items } from "./_components/items";
import { Promo } from "@/components/ui/promo";
import { Quests } from "@/components/ui/quests";
import { useEffect } from "react";

export default function ShopLayout() {
  const { data: userProgress, run } = useAsync(() => getUserProgress());
  useEffect(() => {}, [userProgress]);

  return (
    <>
      {userProgress && (
        <div className="flex flex-row-reverse gap-[48px] px-6">
          <StickyWrapper>
            <UserProgress
              activeCourse={userProgress?.course}
              hearts={userProgress?.hearts}
              points={userProgress?.points}
              hasActiveSubscription={false}
            />
            {true && <Promo />}
            <Quests points={userProgress.points} />
          </StickyWrapper>
          <FeedWrapper>
            <div className="w-full flex flex-col items-center">
              <Image src="/shop.svg" alt="shop" height={90} width={90} />
              <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Shop
              </h1>
              <p className="text-muted-foreground text-center] text-lg mb-6">
                Spend your points on cool stuff!
              </p>
              <Items
                hearts={userProgress?.hearts}
                points={userProgress?.points}
                hasActiveSubscription={false}
                run={run}
              />
            </div>
          </FeedWrapper>
        </div>
      )}
    </>
  );
}
