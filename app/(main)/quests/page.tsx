import QuestsLayout from "@/layouts/quests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duolingo | Quests",
  description: "Duolingo",
};

export default function QuestsPage() {
  return <QuestsLayout />;
}
