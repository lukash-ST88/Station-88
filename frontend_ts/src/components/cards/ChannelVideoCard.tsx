import "./cards.css"
import { IChannelVideo } from "../../interfaces/ChannelInterfaces";
import ChannelVideoLinksHover from "../utils/ChannelVideoLinksHover";

export interface IChannelVideoIndexProps {
  channelVideo: IChannelVideo;
  index: number;
}

const ChannelVideoCard = (props: IChannelVideoIndexProps) => {
  return (
    <div className="channel-card-container">
      <div className="relative">
        <img src={props.channelVideo.poster} className="object-cover h-48 w-full" alt={props.channelVideo.title}/>
        <ChannelVideoLinksHover channelVideo={props.channelVideo} isPost={false}/>
      </div>
      <div className="channel-card-title"><h2 style={{ whiteSpace: 'pre-wrap' }}>{props.channelVideo.title || "\u00A0"} </h2></div>
    </div>
  );  
};

export default ChannelVideoCard;

