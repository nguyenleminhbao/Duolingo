"use client";

import StickyWrapper from "@/components/layouts/web/sticky-wrapper";
import Header from "./_components/header";
import useAsync from "@/hooks/use-async";
import { getUserProgress } from "@/services/user-progress/get";
import { getUnits } from "@/services/units/get";
import { FeedWrapper, UserProgress, Loading } from "@/components/ui";
import UnitsBody from "./units-body";
import { getCourseProgress, getLessonPercentage } from "@/services/courses/get";
import { ILesson } from "@/interfaces/courses";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Promo } from "@/components/ui/promo";
import { Quests } from "@/components/ui/quests";

export default function LearnLayout() {
  const router = useRouter();
  const { data: userProgress } = useAsync(() => getUserProgress());
  const { data: units } = useAsync(() => getUnits());
  const { data: courseProgress } = useAsync(() => getCourseProgress());
  const { data: lessonPercentage } = useAsync(() => getLessonPercentage());

  return (
    <>
      {userProgress ? (
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
            <Header title={userProgress?.course?.title} />
            <UnitsBody
              units={units ?? []}
              activeLesson={courseProgress?.activeLesson as ILesson}
              activeLessonPercentage={lessonPercentage?.percentage ?? 0}
            />
          </FeedWrapper>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
