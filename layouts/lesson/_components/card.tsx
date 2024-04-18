"use client";

import { ChallengeType, IChallengeOption } from "@/interfaces/courses";
import Image from "next/image";
import { use, useCallback } from "react";
import { useAudio, useKey } from "react-use";

type Props = {
  option: IChallengeOption;
  shortCut: string;
  selected: boolean;
  onClick: () => void;
  status: "correct" | "wrong" | "none";
  disabled: boolean;
  type: ChallengeType;
};

export const Card = ({
  option,
  shortCut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  
  const [audio, _, controls] = useAudio({ src: option?.audio_src ?? "" });
  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortCut, handleClick, {}, [handleClick]);
  return (
    <div
      onClick={handleClick}
      className={`h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2 ${
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100"
      } ${
        selected &&
        status == "correct" &&
        "!border-green-300 !bg-green-100 hover:bg-green-100"
      }
        ${
          selected &&
          status == "wrong" &&
          "!border-rose-300 !bg-rose-100 hover:bg-rose-100"
        }
            ${disabled && "pointer-events-none hover:bg-white"}
            ${type == ChallengeType.ASSIST && "lg:p-3 w-full"}`}
    >
      {audio}
      {option?.image_src && (
        <div className=" relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={option?.image_src} alt={option?.text} fill />
        </div>
      )}

      <div
        className={`
          flex items-center justify-between
          ${type == ChallengeType.ASSIST && "flex-row-reverse"}
        `}
      >
        {type == ChallengeType.ASSIST && <div />}
        <p
          className={`
            text-neutral-600 text-sm lg:text-base
            ${selected && "text-sky-500"}
            ${selected && status == "correct" && "!text-green-500"}
            ${selected && status == "wrong" && "!text-rose-500"}
          `}
        >
          {option?.text}
        </p>
        <div
          className={`
            lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold
            ${selected && "border-sky-300 text-sky-500"}
            ${
              selected &&
              status == "correct" &&
              "!border-green-500 !text-green-500"
            }
            ${
              selected && status == "wrong" && "!border-rose-500 !text-rose-500"
            }
          `}
        >
          {shortCut}
        </div>
      </div>
    </div>
  );
};
