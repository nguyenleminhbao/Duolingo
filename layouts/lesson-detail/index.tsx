"use client";

import useAsync from "@/hooks/use-async";
import { getLessons } from "@/services/courses/post";
import { getUserProgress } from "@/services/user-progress/get";
import { Quiz } from "../lesson/_components/quiz";

type Props = {
  slug: string;
};
export default function LessonDetailLayout({ slug }: Props) {
  const { data: lessons } = useAsync(() => getLessons(+slug));
  const { data: userProgress } = useAsync(() => getUserProgress());

  const initialPercentage =
    (Number(
      lessons?.challenges?.filter((challenge) => challenge?.completed).length
    ) /
      Number(lessons?.challenges.length)) *
    100;
  return (
    <>
      {lessons && (
        <Quiz
          initialPercentage={initialPercentage ?? 0}
          initialLessonId={lessons?.id}
          initialHearts={Number(userProgress?.hearts)}
          initialChallenges={lessons.challenges}
          userSubscription={null}
        />
      )}
    </>
  );
}
