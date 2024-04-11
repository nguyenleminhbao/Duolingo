"use client";

import { IChallenge } from "@/interfaces/courses";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialChallenges: IChallenge[];
  userSubscription: any;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialChallenges,
  userSubscription,
}: Props) => {
  return <div>quiz</div>;
};
