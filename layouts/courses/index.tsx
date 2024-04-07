"use client";
import useAsync from "@/hooks/use-async";
import { getAllCourses } from "@/services/courses/get";
import { ListCard } from "./_components/list-card";

export default function CoursesLayout() {
  const { data, run } = useAsync(() => getAllCourses());
  console.log(data);
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto ">
      <h1 className="text-2xl font-bold text-neutral-700 ">
        Languages Courses
      </h1>
      <ListCard courses={data ?? []} activeCourseId={1} />
    </div>
  );
}
