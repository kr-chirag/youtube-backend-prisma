import getPrismaClient from "../utils/prisma";

const prisma = getPrismaClient();

export async function createUser(
    name: string,
    email: string,
    password: string
) {
    const user = await prisma.user.create({
        omit: { password: true },
        data: { name, email, password },
    });
    return user;
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}

export async function getUserByID(userId: number) {
    const user = await prisma.user.findUnique({
        relationLoadStrategy: "join",
        omit: { password: true },
        include: {
            videos: {
                include: {
                    likes: true,
                },
            },
        },
        where: {
            id: userId,
        },
    });
    return {
        ...user,
        videos: user?.videos.map((video) => ({
            ...video,
            likes: video.likes.length,
        })),
    };
}

export async function getAllUsers() {
    const allUsers = await prisma.user.findMany({ omit: { password: true } });
    return allUsers;
}
