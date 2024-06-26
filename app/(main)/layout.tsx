import { MobileHeader } from "@/components/layouts/mobile/mobile-header";
import { Sidebar } from "@/components/layouts/web/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0 ">
        <div className="h-full bg-white max-w-[1056px] mx-auto pt-6">
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
