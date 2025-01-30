import { CronJob } from 'cron';

export const job = new CronJob(
  '*/2 * * * *',  // cronTime - every second
  function () {
    console.log('You will see this message every second');
  }, 
  null,  // onComplete
  true,  // start
  'Asia/Karachi'  // Timezone: Pakistan Standard Time (Asia/Karachi)
);

// job.start() is not needed as it's automatically started with the 4th parameter set to true.