const Dashboard = () => {
  // TODO: Finish the Dashboard
  return (
    <main className="flex-1 flex p-10 overflow-y-auto">
      <div className="flex h-full w-full gap-5 mx-auto container">
        <div className="flex-grow-[3] flex flex-col gap-5">
          <div className="flex-1 flex gap-5 ">
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
              <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
            </div>
            <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
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
        <div className="flex-1 flex flex-col border border-borderColor rounded-lg"></div>
      </div>
    </main>
  );
};

export default Dashboard;
