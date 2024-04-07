import CoursesLayout from "@/layouts/courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duolingo | Courses",
  description: "Courses",
};

export default function CoursesPage() {
  return <CoursesLayout />;
}
