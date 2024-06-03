import { AnalyzedContainer } from "@/components/dashboard/analyzed_container";
import { RecentTransactions } from "@/components/dashboard/recent_transactions/recent_transactions";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return (
    <>
      <main className="flex-1 justify-between flex flex-col px-5 py-4 lg:px-10 lg:pt-10 overflow-y-auto stylish-y-scroll">
        <div className="flex-1 flex flex-col xl:flex-row h-full w-full gap-5 mx-auto container">
          <AnalyzedContainer />
          <RecentTransactions />
          <div className="lg:hidden">
            <Footer
              isContainer={true}
              addPadding={true}
              removePaddingXAxis={true}
            />
          </div>
        </div>
      </main>
      <div className="hidden lg:block">
        <Footer
          isContainer={true}
          addPadding={true}
          removePaddingXAxis={true}
        />
      </div>
    </>
  );
};

//TODO: Also add the media queries in this!

export default Dashboard;
