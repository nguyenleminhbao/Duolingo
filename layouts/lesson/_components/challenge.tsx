"use client";

import { ChallengeType, IChallengeOption } from "@/interfaces/courses";
import { Card } from "./card";

type Props = {
  options: IChallengeOption[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: ChallengeType;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={`grid gap-2 ${type == ChallengeType.ASSIST && "grid-cols-1"} ${
        type == ChallengeType.SELECT &&
        "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      }`}
    >
      {options &&
        options?.map((option, index) => {
          return (
            <Card
              key={option?.id}
              option={option}
              shortCut={`${index + 1}`}
              selected={selectedOption == option?.id}
              onClick={() => onSelect(option?.id)}
              status={status}
              disabled={disabled ?? false}
              type={type}
            />
          );
        })}
    </div>
  );
};
