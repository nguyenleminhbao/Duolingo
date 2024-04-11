import { ICourse } from "@/interfaces/courses";

export interface IUserProgress {
  id: string;
  user_name: string;
  user_image_src: string;
  active_course_id: number;
  hearts: number;
  points: number;
  course: ICourse;
}
