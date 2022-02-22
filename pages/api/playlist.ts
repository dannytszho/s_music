import prisma from '../../lib/prisma'
import { getSession } from "next-auth/react" 



export default (async (req, res) => {
    const session = await getSession({ req })
    console.log("//////////")
    console.log(session)
    console.log("//////////")
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    const playlists = await prisma.playlist.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            name: 'asc'
        }
    })
    console.log(playlists)
    res.json(playlists)
})