import LandingLayout from "@/layouts/landing-page";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Duolingo",
  description: "Duolingo",
};

export default function LandingPage() {
  return <LandingLayout />;
}
