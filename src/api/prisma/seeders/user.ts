import { PrismaClient, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { encryptText } from "@/utils/text";
import { destroyPresentations } from "./presentation";

const prisma = new PrismaClient();

export const destroyUsers = async () => {
    try {
        await destroyPresentations();
        await prisma.user.deleteMany({});

        console.log(`${new Date()} - Resetting Users table...`);
    } catch (error) {
        console.error(`${new Date()} - An error occurred while resetting the Users table:`, error);
    }
};
export const createUsers = async (count: number) => {
    try {
        console.log(`${new Date()} - Creating ${count} users...\n`);

        const users = [];
        for (let i = 0; i < count; i++) {
            const user = await prisma.user.create({
                data: {
                    id: faker.string.uuid(),
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    password: await encryptText(faker.internet.password()),
                    avatar: faker.image.url(),
                    role: faker.helpers.arrayElement(Object.keys(UserRole) as []),
                    status: faker.datatype.boolean(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: Math.random() < 0.5 ? null : new Date()
                }
            });
            users.push(user);
        }

        console.log(`${new Date()} - Created ${count} users successfully!\n`);

        return users;
    } catch (error) {
        console.error(`${new Date()} - An error occurred while creating the users:`, error);
    }
};