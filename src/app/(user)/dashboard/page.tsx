import { InfoBox } from "@/components/universal/info_box";
import revenue from "../../../../public/icons/revenue-icons/business-income.svg";

const Dashboard = () => {
  return (
    <main className="flex-1 flex p-10 overflow-y-auto">
      <div className="flex h-full w-full gap-5 mx-auto container">
        {/* Container */}
        <div className="flex-grow-[3] flex flex-col gap-5">
          <div className="flex-1 flex gap-5 ">
            <div className="flex-1 flex flex-col gap-5">
              <InfoBox
                title="Total expenses all time"
                info="PHP 15,000.00"
                icon={revenue}
                orientation="row"
              />
              <InfoBox
                title="Total expenses all time"
                info="PHP 15,000.00"
                icon={revenue}
                orientation="row"
              />
            </div>
            <InfoBox
              title="Total expenses all time"
              info="PHP 15,000.00"
              icon={revenue}
              orientation="column"
            />
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
              <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
            </div>
          </div>
          <div className="flex-grow-[2] flex gap-5">
            <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
            <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
          </div>
        </div>
        {/* Recent Transaction Container */}
        <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
      </div>
    </main>
  );
};

export default Dashboard;
