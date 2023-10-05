
import { seedStudent } from "./seeder/student";

const process = async () => {
  // await seedAdmin();
  // await seedReward();
  // await seedViolation();
  // await seedClassData();
  // await seedConductData();
  await seedStudent();
};

process().catch((error) => console.log(error.message));
