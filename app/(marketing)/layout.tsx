import { Children } from "react";
import Header from "./header";
import Footer from "./footer";
type Props = {
  children: React.ReactNode;
};
export default function MarketingLayout({ children }: Props) {
  return (
    <div className="flex  flex-col min-h-screen ">
      <Header />
      <main className="flex flex-col lg:m-0 my-6 lg:flex-1 items-center justify-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
