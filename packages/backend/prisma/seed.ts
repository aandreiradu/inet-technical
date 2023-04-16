// import { PrismaClient, User } from '@prisma/client';
// const prisma = new PrismaClient();

// const insert = async () => {
//   return await prisma.user.create({
//     data: {
//       fullName: 'Andrei Radu',
//       password: 'test',
//       username: 'andrei.radu',
//     },
//   });
// };

// (async () => {
//   try {
//     await insert();
//     await prisma.$disconnect();
//   } catch (error) {
//     console.log('error insert seed', error);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// })();
