import { CronJob } from 'cron';
import { User } from '../models/user.model.js';

// Define the cron job to run every 2 minutes
export const job = new CronJob(
  '*/2 * * * *',  // This means the job will run every 2 minutes
  async function () {
    try {
      console.log('Checking for unverified users to delete...');

      // Find users who are not verified
      const unverifiedUsers = await User.find({ isVerified: false });

      if (unverifiedUsers.length > 0) {
        // Delete unverified users
        await User.deleteMany({ isVerified: false });
        console.log(`Deleted ${unverifiedUsers.length} unverified users.`);
      } else {
        console.log('No unverified users to delete.');
      }
    } catch (err) {
      console.error('Error while deleting unverified users:', err);
    }
  },
  null,  // onComplete (not used here)
  true,  // Start the job immediately
  'Asia/Karachi'  // Timezone: Pakistan Standard Time
);

// The job starts automatically with the `true` parameter above, so `job.start()` is not needed.
