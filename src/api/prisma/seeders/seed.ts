import { PrismaClient } from "@prisma/client";
import { createUsers, destroyUsers } from "./user";
import { createPresentations, destroyPresentations } from "./presentation";

const prisma = new PrismaClient();

async function seedMockData() {
    try {
        console.log(`${new Date()} - Establishing database connection...\n`);
        await prisma.$connect();

        await destroyUsers();
        const users = await createUsers(50);

        await destroyPresentations();
        await createPresentations(300, users);

        console.log(`${new Date()} - Created mock data successfully!`);
    } catch (error) {
        console.error(`${new Date()} - An error occurred while creating mock data:`, error);
    } finally {
        await prisma.$disconnect();
    }
}

seedMockData();