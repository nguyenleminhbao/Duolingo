export interface ICourse {
  id?: number;
  title: string;
  image_src: string;
  units: IUnit[];
}

export interface IUnit {
  id: number;
  title: string;
  description: string;
  course_id: number;
  order: number;
  lessons: ILesson[];
  course: ICourse;
}

export interface ILesson {
  id: number;
  title: string;
  order: number;
  unit_id: number;
  challenges: IChallenge[];
  unit?: IUnit;
  completed?: boolean;
}

export interface IChallenge {
  id: number;
  lesson_id: number;
  type: string;
  question: string;
  order: number;
  challenge_progress: any[];
  completed?: boolean;
  challenge_options: IChallengeOption[];
}

export interface IChallengeOption {
  id: number;
  challenge_id: number;
  text: string;
  correct: boolean;
  image_src: string;
  audio_src: string;
}

export interface ICourseProgress {
  activeLesson: ILesson;
  activeLessonId: number;
}
