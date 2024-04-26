import cron from "node-cron";

namespace crons {
  export const initializeCronJobs = () => {
    // Run every minute
    // cron.schedule("* * * * *", sampleCronJob);
  };

  export const sampleCronJob = () => {
    console.log("Cron job executed");
  };
}



export default crons;
