"use client";

import useAsync from "@/hooks/use-async";
import { getLessons } from "@/services/courses/post";
import { getUserProgress } from "@/services/user-progress/get";
import { useEffect, useState } from "react";
import { Quiz } from "./_components/quiz";

export default function LessonLayout() {
  const { data: lessons } = useAsync(() => getLessons());
  const { data: userProgress } = useAsync(() => getUserProgress());
  const [initalPercentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    const percentage =
      (Number(
        lessons?.challenges?.filter((challenge) => challenge?.completed).length
      ) /
        Number(lessons?.challenges.length)) *
      100;

    setPercentage(percentage);
  }, [lessons]);

  return (
    <>
      {lessons && (
        <Quiz
          initialPercentage={initalPercentage ?? 0}
          initialLessonId={lessons?.id}
          initialHearts={Number(userProgress?.hearts)}
          initialChallenges={lessons.challenges}
          userSubscription={null}
        />
      )}
    </>
  );
}
