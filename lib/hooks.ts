import { Playlist } from '.prisma/client'
import useSWR from 'swr'
import playlist from '../pages/api/playlist'
import fetcher from './fetcher'

export const useMe = () => {
    const { data, error } = useSWR('/me', fetcher)

    return {
        user: data,
        isLoading: !data && !error,
        isError: error,
    }
}

export const usePlaylist = () => {
    const {data, error} = useSWR('/playlist', fetcher)
    let playlists = []

    if (data !== undefined && !data.error) {
        playlists = data
    }
    console.log(data)
    console.log(error)

    return {
        playlists,
        isLoading: !data && !error,
        isError: error,
    }
}
