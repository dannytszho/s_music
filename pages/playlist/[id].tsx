import GradientLayout from "../../components/gradientLayout"
import SongTable from "../../components/songsTable"
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"
import { getSession } from "next-auth/react"

const getBGColor = id => {
    const colors = [
        'red',
        'green',
        'blue',
        'orange',
        'purple',
        'gray',
        'teal',
        'yellow'
    ]
    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const PlayList = ({ playlist }) => {
    const color = getBGColor(playlist.id)
    return (
        <GradientLayout 
            color={color}
            roundImage={false} 
            title={playlist.name} 
            subtitle="playlist" 
            description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/400?random=${playlist.id}`}
        >
            <SongTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export async const getServerSideProps(ctx) {
    const session = await getSession(ctx)
    console.log(session)
    
    const [playlist] = await prisma.playlist.findMany({
        where: {
            userId: session.id,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        }

    })
    return {
        props: { session, playlist }
    }

}
export default PlayList

