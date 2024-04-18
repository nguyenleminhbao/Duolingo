"use client";

import { useState, useTransition } from "react";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import Confetti from "react-confetti";

import { ChallengeType, IChallenge } from "@/interfaces/courses";
import { reduceHearts } from "@/services/user-progress/post";
import { upsertChallengeProgress } from "@/services/courses/post";
import useHeartModal from "@/zustand/use-heart-modal";
import usePracticeModal from "@/zustand/use-practice-modal";

import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { toast } from "sonner";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialChallenges: IChallenge[];
  userSubscription: any;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialChallenges,
  userSubscription,
}: Props) => {
  const router = useRouter();
  const { open: openHeartModal } = useHeartModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage == 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();
  const [pending, startTransition] = useTransition();
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAduio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState<number>(initialHearts);
  const [percentage, setPercentage] = useState<number>(() =>
    initialPercentage == 100 ? 0 : initialPercentage
  );
  const [challenges, setChallenge] = useState<IChallenge[]>(initialChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges?.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex == -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setSatus] = useState<"correct" | "wrong" | "none">("none");
  const onSelect = (id: number) => {
    if (status != "none") return;
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;
    if (status == "wrong") {
      setSatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status == "correct") {
      onNext();
      setSatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options?.find((option) => option?.correct);

    if (!correctOption) return;
    if (correctOption && correctOption?.id == selectedOption) {
      startTransition(async () => {
        const dataUpsert = await upsertChallengeProgress(challenge?.id);

        if (dataUpsert) {
          setSatus("correct");
          correctControls.play();
          setPercentage((prev) => prev + 100 / challenges?.length);

          if (initialPercentage == 100) {
            setHearts((prev) => Math.min(prev + 1, 5));
          }
        } else {
          //toast.error("Missing hearts");
          toast.error("Something went wrong. Please try again.");
        }
      });
    } else {
      startTransition(async () => {
        const dataReduce = await reduceHearts(challenge?.id);
        if (!dataReduce) {
          openHeartModal();
          toast.error("Missing hearts");
        } else {
          setHearts((prev) => Math.max(prev - 1, 0));
        }
      });
      incorrectControls.play();
      setSatus("wrong");
    }
  };

  const challenge = challenges[activeIndex];
  const options = challenge?.challenge_options ?? [];

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src="/finish.svg"
            alt="finish"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/finish.svg"
            alt="finish"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You are completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges?.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  const title =
    challenge?.type == ChallengeType.ASSIST
      ? "Select the correct meaning"
      : challenge?.question;

  return (
    <>
      {correctAudio}
      {incorrectAduio}
      <Header
        hearts={hearts}
        percentage={isNaN(percentage) ? initialPercentage : percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge?.type == ChallengeType.ASSIST && (
                <QuestionBubble question={challenge?.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge?.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
