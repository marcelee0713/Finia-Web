import { AnalyzedContainer } from "@/components/dashboard/analyzed_container";
import { RecentTransactions } from "@/components/dashboard/recent_transactions";
import { Footer } from "@/components/footer";

const Dashboard = () => {
  return (
    <>
      <main className="flex-1 justify-between flex flex-col px-10 pt-10 overflow-y-auto stylish-y-scroll">
        <div className="flex-1 flex h-full w-full gap-5 mx-auto container">
          <AnalyzedContainer />
          <RecentTransactions />
        </div>
      </main>
      <Footer isContainer={true} addPadding={true} removePaddingXAxis={true} />
    </>
  );
};

//TODO: Handle States in every single request, for loading, error, and no content states!
//TODO: Add a way to switch up from EXPENSES to REVENUE,
//TODO: Also add the media queries in this!

export default Dashboard;
