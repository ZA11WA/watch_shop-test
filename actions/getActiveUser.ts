import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getActiveUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const activeUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!activeUser) {
      return null;
    }
    return {
      ...activeUser,
      createdAt: activeUser.createAt.toISOString(),
      updateAt: activeUser.updateAt.toISOString(),
      emailVerified: activeUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
