import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";
import authHandler from "./auth/[...nextauth]";
import { getSession } from "next-auth/react"
import { NextApiHandler } from "next";

export default async (req, res) => {
    const session = await getSession({ req })


    if (session) {

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        const playlistsCount = await prisma.playlist.count({
            where: {
                userId: user.id,
            },
        })
        res.json({ ...user, playlistsCount })
    }
}
