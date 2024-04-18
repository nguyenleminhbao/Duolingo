import { Metadata } from "next";
import Image from "next/image";

const metadata: Metadata = {
  title: "Duolingo | Forbidden",
  description: "Duolingo",
};

export default function page() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={"/forbidden.jpeg"} alt="forbidden" width={300} height={300} />
    </div>
  );
}
