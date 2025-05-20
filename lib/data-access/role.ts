import { prisma } from "@/lib/prisma";

export default async function getRoles() {
  return prisma.role.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
