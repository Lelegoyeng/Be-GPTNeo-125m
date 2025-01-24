import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedEmployee() {
  console.log('🔃 Starting Seeds employee.seeds.ts...');
  console.log('     🗑️  Menghapus data lama...');

  await prisma.employee.deleteMany();

  const source = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      salary: 7500000,
      hiredAt: new Date('2023-01-15'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Project Manager',
      salary: 12000000,
      hiredAt: new Date('2022-03-10'),
    },
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'UI/UX Designer',
      salary: 6500000,
      hiredAt: new Date('2023-06-01'),
    },
    {
      id: 4,
      name: 'Bob Brown',
      position: 'QA Engineer',
      salary: 5500000,
      hiredAt: new Date('2021-11-20'),
    },
    {
      id: 5,
      name: 'Eve Davis',
      position: 'DevOps Engineer',
      salary: 8000000,
      hiredAt: new Date('2020-08-01'),
    },
  ];

  console.log('     🌱 Menambahkan data baru...');
  await prisma.employee.createMany({
    data: source,
  });

  console.log('     ✅ Database seeded successfully');
}
