import { PrismaClient } from "@prisma/client"
import { saltAndHashPassword } from "../utils";

const users = [
    {
        email: "jane.doe@example.com",
        password: "password123",
        f_name: "Jane",
        l_name: "Doe",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        email: "john.doe@example.com",
        password: "password123",
        f_name: "John",
        l_name: "Doe",
        created_at: new Date(),
        updated_at: new Date()
    }
];

const prisma = new PrismaClient()

async function seedDatabase() {
    for (const element of users) {
        console.log(element.password);
        const hashedPassword = await saltAndHashPassword(element.password);
        element.password = hashedPassword;
        console.log(element);
    }
    return await prisma.user.createMany({
        data: users
    });
}


seedDatabase().then(() => {
    console.log("Database seeded successfully");
    prisma.$disconnect();
}).catch((error) => {
    console.error("Error seeding database: ", error);
    prisma.$disconnect();
});

