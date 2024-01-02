import prisma from "@/libs/prismadb";

describe("Połączenie z Bazą Danych", () => {
  it("połączenie poprawne!", async () => {
    let isConnected = false;
    try {
      await prisma.$connect();
      isConnected = true;
    } catch (error) {
      console.error("brak połączenia z bazą danych!", error);
    }

    expect(isConnected).toBeTruthy();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
