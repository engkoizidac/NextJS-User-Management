import { Status } from "@prisma/client";
import { prisma } from "../lib/prisma";

export default async function getUsers() {
  return await prisma.user.findMany({
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
}

export async function getUserById(userId: string) {
  try {
    return await prisma.user.findUnique({
      select: {
        id: true,
        fullName: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("Error retreiving user data!", error);
    throw new Error("Failed to retreiving user!");
  }
}

export async function postUser(
  fullName: string,
  username: string,
  password: string,
  status: Status
) {
  try {
    await prisma.user.create({
      data: {
        fullName: fullName,
        username: username,
        password: password,
        status: status,
        updatedAt: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user!");
  }
}

export async function removeUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again!");
  }
}

export async function patchUser(
  userId: string,
  fullName: string,
  username: string,
  status: Status
) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: fullName,
        username: username,
        status: status,
        updatedAt: new Date().toISOString(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error update changes on user:", error);
    throw new Error("Failed to update changes on user!");
  }
}

export async function blankUserPassword(userId: string, password: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: password,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error on clearing user password:", error);
    throw new Error("Failed on clearing user password. Please try again.");
  }
}

export async function updateUserPassword(userId: string, newPassword: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error on updating user password:", error);
    throw new Error("Failed on updating user password. Please try again.");
  }
}
