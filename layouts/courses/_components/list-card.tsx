"use client";

import { ICourse } from "@/interfaces/courses";
import { Card } from "./card";

type Props = {
  courses: ICourse[];
  activeCourseId: number;
};

export const ListCard = ({ courses, activeCourseId }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses &&
        courses?.map((course, id) => {
          return (
            <Card
              key={course.id}
              id={course?.id as number}
              title={course?.title}
              image_src={course?.image_src}
              disabled={false}
              active={course?.id === activeCourseId}
            />
          );
        })}
    </div>
  );
};
