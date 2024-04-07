import StickyWrapper from "@/components/layouts/web/sticky-wrapper";
import FeedWrapper from "@/components/ui/feed-wrapper";
import { UserProgress } from "@/components/ui/user-progress";
import Header from "./_components/header";

export default function LearnLayout() {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
        <div className="w-full flex flex-col space-y-3">
          <div className=" bg-pink-500 h-[500px] w-full"></div>
          <div className=" bg-pink-500 h-[500px] w-full"></div>
          <div className=" bg-pink-500 h-[500px] w-full"></div>

          <div className=" bg-pink-500 h-[500px] w-full"></div>
          <div className=" bg-pink-500 h-[500px] w-full"></div>
          <div className=" bg-pink-500 h-[500px] w-full"></div>
        </div>
      </FeedWrapper>
    </div>
  );
}
