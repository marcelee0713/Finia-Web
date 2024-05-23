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

export default Dashboard;
