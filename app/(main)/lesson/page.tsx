import LessonLayout from "@/layouts/lesson";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lesson detail",
  description: "Duolingo | Lesson",
};

export default function LessonPage({ params: { slug } }: { params: any }) {
  return <LessonLayout />;
}
