import dateTime from "../../utils/dateTime";
import { IChannelVideoIndexProps } from "../cards/ChannelVideoCard";
import { FaVk } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import ChannelVideoLinksHover from "../utils/ChannelVideoLinksHover";

const ChannelVideoPost = (props: IChannelVideoIndexProps) => {
  return (
      <div className="channel-post-container"  key={props.index}>
        <div className="channel-post-duration-container overflow-hidden">
          <div className="vertical">
            <div className="flex justify-center items-center gap-1 divide-y-2">
              <div className="">Хронометраж: {props.channelVideo.duration} Мин.</div>
            </div>
          </div>
        </div>
        <div className="col-span-14 channel-image-container">
          <div className="relative">
            <img className="channel-post-image" src={props.channelVideo.poster} alt={props.channelVideo.title}/> 
            <ChannelVideoLinksHover channelVideo={props.channelVideo} isPost={true}/>
          </div>
          <h2 className="flex justify-center"><div className="post-type-fixed">Канал</div></h2>
          <h3 className="channel-text absolute bottom-0 flex justify-center items-center w-full mb-1 p-1 bg-white text-st88-background" ><div>{props.channelVideo.title}</div></h3>
        </div> 
        <div className="channel-post-date ">
          <div className="vertical flex divide-y-2 gap-1">{dateTime(props.channelVideo.release_date).map((dateItem: string)=><div className="pt-1">{dateItem}</div>)}</div>
        </div>
      </div>
  );
};

export default ChannelVideoPost;