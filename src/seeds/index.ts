import { PrismaClient } from '@prisma/client';
import { seedEmployee } from './employee.seeds';

async function runSeeds() {
  await seedEmployee();
}

runSeeds()
  .catch((error) => {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  });
