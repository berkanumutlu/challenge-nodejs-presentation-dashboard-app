import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export const destroyPresentations = async () => {
    try {
        await prisma.presentation.deleteMany({});

        console.log(`${new Date()} - Resetting Presentations table...`);
    } catch (error) {
        console.error(`${new Date()} - An error occurred while resetting the Presentations table:`, error);
    }
};
export const createPresentations = async (count: number, users: User[]) => {
    try {
        console.log(`${new Date()} - Creating ${count} presentations...\n`);

        const presentations = [];
        for (let i = 1; i < count + 1; i++) {
            presentations.push({
                id: faker.string.uuid(),
                name: faker.company.name(),
                thumbnailImage: faker.image.url(),
                userId: faker.helpers.arrayElement(users).id,
                status: faker.datatype.boolean(),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: Math.random() < 0.5 ? null : new Date()
            });
        }
        const createdPresentations = await prisma.presentation.createMany({ data: presentations });

        console.log(`${new Date()} - Created ${count} presentations successfully!\n`);

        return createdPresentations;
    } catch (error) {
        console.error(`${new Date()} - An error occurred while creating the presentations:`, error);
    }
};