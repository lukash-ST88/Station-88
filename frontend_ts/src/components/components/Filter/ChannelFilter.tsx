import MyInput from "../../UI/MyInput/MyInput"
import MySelect from "../../UI/MySelect/MySelect"
import React from "react"
import ReactSlider from 'react-slider'
import { IChannelPlaylist, IChannelVideo } from "../../../interfaces/ChannelInterfaces"
import Loader from "../Loader/Loader"



interface FilterProps {
    sort: string,
    search: string
    setSearch(arg: string): void
    setSort(arg: string): void
    channelPlaylistSlug: string,
    setChannelVideos(channelVideos: IChannelVideo[]): void,
    setChannelPLaylistSlug(selectedChannelPlaylist: string): void,
    setOffset(offset: number): void,
    channelPlaylists: IChannelPlaylist[]
    durationRange: number[],
    setDurationRange(arg: number[]): void
    defaultDurationRange: number[]
}

const ChannelFilter = (props: FilterProps) => {
    return (
        <>
            <MyInput 
                value={props.search} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setSearch(event.target.value)}
                className="lg:px-2 pr-5 lg:mr-2 lg:ml-[0.60rem]"
            />
            <div className="lg:mx-2 flex lg:block lg:mr-2 lg:ml-[0.60rem]">
                <MySelect
                    value={props.sort}
                    onChange={(selectedSort) => {
                        props.setSort(selectedSort);
                    }}
                    defaultValue="Сортировка"
                    options={[
                        { value: "-release_date", name: "по дате - новые"},
                        { value: "release_date", name: "по дате - старые" }
                    ]}
                />
                <MySelect
                    className=""
                    value={props.channelPlaylistSlug}
                    onChange={(selectedPlaylist) => {
                        props.setChannelPLaylistSlug(selectedPlaylist);
                    }}
                    defaultValue="Плейлист"
                    options={props.channelPlaylists.map((channelPlaylist: IChannelPlaylist)=>{
                        return {value: channelPlaylist.url, name: channelPlaylist.title}
                    })}
                    
                />
            </div>
            <div className="lg:mt-4 lg:ml-5 mx-2 lg:mx-0">
                        <div className="m-2 flex justify-center items-center text-gray-500 text-xl">Хронометраж</div>
                        <ReactSlider
                                className="w-full h-2 bg-gray-500 cursor-pointer flex items-center justify-center"
                                trackClassName="bg-st88-secondary"
                                defaultValue={props.durationRange}
                                min={props.defaultDurationRange[0]}
                                max={props.defaultDurationRange[1]}
                                step={1}
                                onAfterChange={(newDurationRange: number[]) => props.setDurationRange(newDurationRange)}
                                renderThumb={(props, state) => (
                                    <div {...props} className="p-1 bg-white border-2 min-w-[35px] rounded flex items-center justify-center text-st88-background text-xs font-bold focus:ring-white focus:outline-none focus:ring-2">
                                        {state.valueNow}
                                    </div>
                                )}
                                renderTrack={(props, state) => {
                                    const trackColor = state.index === 1 ? 'bg-white border-2' : 'bg-gray-500';
                                    return (
                                    <div 
                                        {...props} 
                                        className={`h-2 ${trackColor}`}
                                    />
                                    );
                                }}
                            />
            </div>
        </>
    )
}

export default ChannelFilter;