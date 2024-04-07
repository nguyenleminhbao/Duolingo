import LearnLayout from "@/layouts/learn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duolingo | Learn",
  description: "Learn",
};

const LearnPage = () => {
  return <LearnLayout />;
};

export default LearnPage;
