import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getActiveUser } from "@/actions/getActiveUser";

export async function PUT(request: Request) {
  const currentUser = await getActiveUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus },
  });
  return NextResponse.json(order);
}
