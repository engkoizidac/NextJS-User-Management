import { prisma } from "./prisma";

export default async function getUsers() {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      password: true,
      status: true,
      fullName: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      fullName: "asc",
    },
  });

  return data;
}
