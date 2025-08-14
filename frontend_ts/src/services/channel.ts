import axios from "axios";
import { API_URL } from "./settings/urls";
import { IChannelPlaylistRetrieve, IChannelVideoMaxDuration, IChannelVideoRetrieve } from "../interfaces/ChannelInterfaces";

class ChannelService {

    static getAllChannelVideos(limit: number, offset: number = 0) {
        const url = `${API_URL}/API/channel/video`;
        const response = axios.get<IChannelVideoRetrieve>(url, {
        params: {
            limit: limit,
            offset: offset,
        },
        });
        return response;
    };

    static getSortedChannelVideos(limit: number, offset: number, sort: string){
        const url = `${API_URL}/API/channel/video/sort/${sort}`;
        const response = axios.get<IChannelVideoRetrieve>(url, {
            params: {
                limit,
                offset,
            }
            }
        )
        return response;
    }

    static getFilteredChannelVideos(limit: number, offset: number = 0, sort: string, playlist_slug: string, search_characters: string, start_duration: number = 0, end_duration: number = 0){
        const url = `${API_URL}/API/channel/video/filters`
        const response = axios.get<IChannelVideoRetrieve>(url, {
            params: {
                limit,
                offset,
                sort,
                playlist_slug,
                search_characters,
                start_duration,
                end_duration
            }
        })
        return response;
    }

    static getAllChannelPlaylists() {
        const url = `${API_URL}/API/channel/playlist`;
        const response = axios.get<IChannelPlaylistRetrieve>(url)
        return response;
    };
}

export default ChannelService;