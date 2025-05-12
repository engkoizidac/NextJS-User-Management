import { Status } from "@prisma/client";
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

export async function postUser(
  fullName: string,
  username: string,
  password: string,
  status: Status
) {
  try {
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        username: username,
        password: password,
        status: status,
        updatedAt: new Date().toISOString(),
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
