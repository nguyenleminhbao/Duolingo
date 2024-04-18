"use client";

import { ILesson } from "@/interfaces/courses";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: ILesson[];
  activeLesson: ILesson | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  description,
  title,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <div>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons &&
          lessons?.map((lesson, index) => {
            const isCurrent = lesson?.id === activeLesson?.id;
            const isLocked = !lesson?.completed && !isCurrent;
            return (
              <LessonButton
                id={lesson.id}
                key={lesson.id}
                index={index}
                totalCount={lessons?.length - 1}
                current={isCurrent}
                locked={isLocked}
                percentage={activeLessonPercentage}
              />
            );
          })}
      </div>
    </div>
  );
};
