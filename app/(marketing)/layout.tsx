import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

type Props = {
  children: React.ReactNode;
};

const MarketingPage = ({ children }: Props) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingPage;
