import { FaVk } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import { IChannelVideo } from "../../interfaces/ChannelInterfaces";

interface IChannelVideoLinksHoverProps {
    channelVideo: IChannelVideo
    isPost: boolean
}

const ChannelVideoLinksHover = (props: IChannelVideoLinksHoverProps) => {
    return (
        <>
            {props.channelVideo.vk_link 
                        ?
                            <>
                                <div className="absolute grid grid-cols-2 inset-0 ">
                                    <a href={props.channelVideo.youtube_link}><div className={`bg-red-500/80 ${props.isPost ? 'channel-post-network': 'channel-card-network'}`}><TfiYoutube className={`${props.isPost ? "text-2xl":"text-2xl"} lg:hidden`}/></div></a>
                                    <a href={props.channelVideo.vk_link}><div className={`bg-blue-500/80 ${props.isPost ? 'channel-post-network': 'channel-card-network'}`}><FaVk className={`${props.isPost ? "text-2xl":"text-2xl"} lg:hidden`}/></div></a>
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <div className="bg-st88-background p-1 opacity-80">{props.channelVideo.duration} Мин.</div>
                                </div>
                                <div className="hidden absolute inset-0 lg:grid grid-cols-2 ">
                                    <div className="group/youtube h-full">
                                        <a 
                                            href={props.channelVideo.youtube_link} 
                                            className="channel-card-image-hover bg-red-500/0 group-hover/youtube:bg-red-500/80"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <TfiYoutube className="channel-card-image-hover-icon group-hover/youtube:opacity-100" />
                                        </a>
                                    </div>
                                    <div className="group/vk h-full">
                                        <a 
                                            href={props.channelVideo.vk_link} 
                                            className="channel-card-image-hover bg-blue-500/0 group-hover/vk:bg-blue-500/80"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaVk className="channel-card-image-hover-icon group-hover/vk:opacity-100" />
                                        </a>
                                    </div>
                                </div>
                            </>
                    :
                        <>
                            <div className={`absolute grid ${props.isPost ? 'grid-cols-2':'grid-cols-1'} inset-0`}>
                                <a href={props.channelVideo.youtube_link}><div className={`bg-red-500/80 ${props.isPost ? 'channel-post-network': 'channel-card-network'}`}><TfiYoutube className={`${props.isPost ? "text-2xl":"text-2xl"} lg:hidden`}/></div></a>
                                {props.isPost && <a href={props.channelVideo.youtube_link}><div className={`bg-red-500/80 ${props.isPost ? 'channel-post-network': 'channel-card-network'}`}><TfiYoutube className={`${props.isPost ? "text-2xl":"text-2xl"} lg:hidden`}/></div></a>}
                            </div>
                            <div className="absolute bottom-0 right-0">
                                <div className="bg-st88-background p-1 opacity-80">{props.channelVideo.duration} Мин.</div>
                            </div>
                            <div className="hidden lg:grid grid-cols-1 absolute inset-0 group/youtube h-full">
                                <a 
                                    href={props.channelVideo.youtube_link} 
                                    className="channel-card-image-hover bg-red-500/0 group-hover/youtube:bg-red-500/80 "
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <TfiYoutube className="channel-card-image-hover-icon group-hover/youtube:opacity-100" />
                                </a>
                            </div>
                        </>
                    }
        </>
    )
}

export default ChannelVideoLinksHover;