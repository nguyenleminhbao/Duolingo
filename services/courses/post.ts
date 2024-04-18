import { ILesson } from "@/interfaces/courses";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";
import { cache } from "react";

export const getLessons = async (lesson_id?: number) => {
  try {
    const { data, status } = await axiosInstance.post("/courses/get-lessons", {
      lesson_id,
    });
    return returnData<ILesson>(data);
  } catch (err) {
    throw err;
  }
};

export const upsertChallengeProgress = cache(async (challenge_id: number) => {
  try {
    const { data, status } = await axiosInstance.post(
      "/courses/upsert-challenge-progress",
      {
        challenge_id: challenge_id,
      }
    );
    return returnData<string>(data);
  } catch (err) {
    throw err;
  }
});
