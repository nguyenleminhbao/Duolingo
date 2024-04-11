"use client";

import { ILesson, IUnit } from "@/interfaces/courses";
import { Unit } from "../_components/unit";

type Props = {
  units: IUnit[];
  activeLesson: ILesson;
  activeLessonPercentage: number;
};

export default function UnitsBody({
  units,
  activeLesson,
  activeLessonPercentage,
}: Props) {
  return (
    <>
      {units &&
        units?.map((unit) => {
          return (
            <div key={unit?.id} className="mb-10">
              <Unit
                id={unit?.id}
                order={unit?.order}
                description={unit?.description}
                title={unit?.title}
                lessons={unit?.lessons}
                activeLesson={activeLesson}
                activeLessonPercentage={activeLessonPercentage}
              />
            </div>
          );
        })}
    </>
  );
}
