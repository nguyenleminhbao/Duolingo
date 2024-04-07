"use client";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  image_src: string;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({ title, id, image_src, disabled, active }: Props) => {
  return (
    <div
      className={`h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]
      ${disabled && "pointer-events-none opacity-50"}`}
    >
      <div className=" min-h-[24px] min-w-[24px] w-full flex items-center justify-end ">
        {active && (
          <div className="!rounded-md !bg-green-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-4 w-4 rounded-md" />
          </div>
        )}
      </div>

      <Image
        src={image_src}
        alt={title}
        height={70}
        width={93.33}
        className=" rounded-lg drop-shadow-md border object-cover"
      />
      <p className=" text-neutral-700 text-center">{title}</p>
    </div>
  );
};
