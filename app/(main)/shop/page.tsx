import ShopLayout from "@/layouts/shop";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Shop | Duolingo",
  description: "Duolingo",
};

export default function ShopPage() {
  return <ShopLayout />;
}
