"use client";

import { ICourse } from "@/interfaces/courses";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import useAsync from "@/hooks/use-async";
import { updateUserProgress } from "@/services/user-progress/post";
import { toast } from "sonner";

type Props = {
  courses: ICourse[];
  activeCourseId: number;
};

export const ListCard = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const { data, run: runUpdate } = useAsync(updateUserProgress, true);
  const [pending, startTransition] = useTransition();

  const onClikck = (id: number) => {
    if (pending) return true;

    startTransition(() => {
      runUpdate(() =>
        updateUserProgress({
          active_course_id: id,
        })
      );
    });
    if (id == data?.active_course_id) {
      router.push("/learn");
    }
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses &&
        courses?.map((course, id) => {
          return (
            <Card
              key={course.id}
              id={course?.id as number}
              title={course?.title}
              onClick={onClikck}
              image_src={course?.image_src}
              disabled={pending}
              active={course?.id === activeCourseId}
            />
          );
        })}
    </div>
  );
};
