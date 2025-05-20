import { Status } from "@prisma/client";
import { prisma } from "../prisma";

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
    throw new Error("Failed to create user");
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
    throw new Error("Failed to delete user. Please try again.");
  }
}

export async function saveChangesOnUser(
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
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again.");
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
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user. Please try again.");
  }
}
