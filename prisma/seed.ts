import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      id: 1,
      name: 'StarPanda',
      password: bcrypt.hashSync('123123', 10),
      email: 'user@example.com',
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
