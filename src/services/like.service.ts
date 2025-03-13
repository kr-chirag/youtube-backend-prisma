import getPrismaClient from "../utils/prisma";

const prisma = getPrismaClient();

export async function getLike(videoId: number, userId: number) {
    const like = await prisma.like.findFirst({ where: { videoId, userId } });
    return like;
}

export async function insertLike(videoId: number, userId: number) {
    const like = await prisma.like.create({ data: { videoId, userId } });
    return like;
}

export async function deleteLike(videoId: number, userId: number) {
    await prisma.like.deleteMany({ where: { videoId, userId } });
}
