"use client";
import useAsync from "@/hooks/use-async";
import { getAllCourses } from "@/services/courses/get";
import { ListCard } from "./_components/list-card";
import { getUserProgress } from "@/services/user-progress/get";
import { userId } from "@/constants/user";
import { Loading } from "@/components/ui/loading";

export default function CoursesLayout() {
  const { data, run } = useAsync(() => getAllCourses());
  const { data: userProgress } = useAsync(() => getUserProgress());

  return (
    <>
      {data ? (
        <div className="h-full max-w-[912px] px-3 mx-auto ">
          <h1 className="text-2xl font-bold text-neutral-700 ">
            Languages Courses
          </h1>
          <ListCard
            courses={data ?? []}
            activeCourseId={userProgress?.active_course_id ?? 1}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
