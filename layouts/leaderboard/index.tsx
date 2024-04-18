"use client";

import StickyWrapper from "@/components/layouts/web/sticky-wrapper";
import { FeedWrapper, UserProgress } from "@/components/ui";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Promo } from "@/components/ui/promo";
import { Quests } from "@/components/ui/quests";
import { Separator } from "@/components/ui/separator";
import useAsync from "@/hooks/use-async";
import { getTopTenUsers } from "@/services/courses/get";
import { getUserProgress } from "@/services/user-progress/get";
import Image from "next/image";

export default function LeaderboardLayout() {
  const { data: userProgress, run } = useAsync(() => getUserProgress());
  const { data: topTenUsers } = useAsync(() => getTopTenUsers());
  return (
    <>
      {userProgress && (
        <div className="flex flex-row-reverse gap-[48px] px-6">
          <StickyWrapper>
            <UserProgress
              activeCourse={userProgress.course}
              hearts={userProgress.hearts}
              points={userProgress.points}
              hasActiveSubscription={false}
            />
            {true && <Promo />}
            <Quests points={userProgress.points} />
          </StickyWrapper>
          <FeedWrapper>
            <div className="w-full flex flex-col items-center">
              <Image
                src="/leaderboard.svg"
                alt="Leaderboard"
                height={90}
                width={90}
              />
              <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Leaderboard
              </h1>
              <p className="text-muted-foreground text-center text-lg mb-6">
                See where you stand among other learners in the community.
              </p>
              <Separator className="mb-4 h-0.5 rounded-full" />

              {topTenUsers &&
                topTenUsers.map((userProgress, index) => (
                  <div
                    key={userProgress?.id}
                    className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
                  >
                    <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                    <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                      <AvatarImage
                        className="object-cover"
                        src={userProgress?.user_image_src}
                      />
                    </Avatar>
                    <p className="font-bold text-neutral-800 flex-1">
                      {userProgress?.user_name}
                    </p>
                    <p className="text-muted-foreground">
                      {userProgress?.points} XP
                    </p>
                  </div>
                ))}
            </div>
          </FeedWrapper>
        </div>
      )}
    </>
  );
}
