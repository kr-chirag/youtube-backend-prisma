import getPrismaClient from "../utils/prisma";

const prisma = getPrismaClient();

export async function insertVideo(
    title: string,
    url: string,
    createdBy: number,
    description?: string
) {
    const video = await prisma.video.create({
        data: {
            title,
            url,
            createdBy,
            description,
        },
    });
    return video;
}

export async function getVideo(id: number) {
    const video = await prisma.video.findUnique({
        where: { id },
        include: { likes: true },
    });
    return { ...video, likes: video?.likes.length };
}

export async function deleteVideo(videoId: number) {
    const video = await prisma.video.delete({ where: { id: videoId } });
    return video;
}
