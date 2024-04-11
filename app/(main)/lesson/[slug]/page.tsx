import LessonDetailLayout from "@/layouts/lesson-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson",
  description: "Duolingo | Lesson",
};

export default function LessonsPage({ params: { slug } }: { params: any }) {
  return <LessonDetailLayout slug={slug} />;
}
