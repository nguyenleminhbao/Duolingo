import LeaderboardLayout from "@/layouts/leaderboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duolingo | Leaderboard",
  description: "Duolingo",
};

export default function LeaderboardPage() {
  return <LeaderboardLayout />;
}
