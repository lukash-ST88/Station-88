import { useState, useEffect, useRef } from "react";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import Loader from "../components/components/Loader/Loader";
import { useDidMountEffect } from "../hooks/useDidMountEffect";
import { channelPageMeta } from "../utils/metaContent";
import {
  Collapse,
} from "@material-tailwind/react";
import FilterNav from "../components/components/Filter/FilterNav";
import { IChannelPlaylist, IChannelVideo } from "../interfaces/ChannelInterfaces";
import ChannelService from "../services/channel";
import ChannelFilter from "../components/components/Filter/ChannelFilter";
import ChannelVideoCard from "../components/cards/ChannelVideoCard";


function Channel() {
  const [openNav, setOpenNav] = useState(false);

  const [channelVideos, setChannelVideos] = useState<IChannelVideo[]>([]);
  const [channelPlaylists, setChannelPlaylists] = useState<IChannelPlaylist[]>([])
  
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [channelPlaylistSlug, setChannelPlaylistSlug] = useState<string>("")
  
  const defaultDurationRange: number[] = [1, 120];
  const [durationRange, setDurationRange] = useState<number[]>(defaultDurationRange); 
 
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  
  const lastElement = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
      fetchChannelVideos(limit, offset, sort);
  }, [offset]);

  useEffect(()=>{
    fetchChannelPlaylists();
  }, [])

  useEffect(()=>{
    if (window.innerWidth >= 960) setOpenNav(true);
  },[])

  useDidMountEffect(() => {
    fetchChannelVideos(limit, 0, sort);
    setOffset(0);
  }, [sort, search, channelPlaylistSlug, durationRange]);

  const [fetchChannelVideos, isChannelVideosLoading, channelError]: any = useFetching(
    async (limit: number, offset: number, sort: string) => {
      let response;
      if(channelPlaylistSlug || search || durationRange != defaultDurationRange){
        response = await ChannelService.getFilteredChannelVideos(limit, offset, sort, channelPlaylistSlug, search, durationRange[0], durationRange[1]);
      } else {
        response = sort.length ? await ChannelService.getSortedChannelVideos(limit, offset, sort) : await ChannelService.getAllChannelVideos(limit, offset);
      }
      if(offset == 0){
        setChannelVideos(response.data.results);
      } else {
        setChannelVideos([...channelVideos, ...response.data.results]);
      }
      const totalCount = response.data.count;
      setTotalPages(getPageCount(totalCount, limit));
    }
  );



  useObserver(
    lastElement,
    offset / limit + 1 < totalPages,
    () => setOffset(offset + limit),
    isChannelVideosLoading
  );

  async function fetchChannelPlaylists() {
    const response = await ChannelService.getAllChannelPlaylists();
    setChannelPlaylists(response.data.results)
  }

  function resetFilter(){
    setSort("");
    setSearch(""); 
    setChannelPlaylistSlug("");
    setDurationRange(defaultDurationRange);
  }

  return (
    <>
      <title> Канал </title> 
      <meta name="description" content={channelPageMeta}/>

      <div className="flex flex-wrap justify-center">
        <div className="lg:w-5/6 lg:order-1 order-2 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              {channelVideos.map(
                (channelVideo: IChannelVideo, index: number) => {
                  return <ChannelVideoCard channelVideo={channelVideo} index={index} />;
                }
              )}
            </div>
          {channelVideos.length === 0 && 
            <div className="flex justify-center">
              <div className="border p-2 border-st88-secondary text-st88-secondary">
                Видео не найдены
              </div>
            </div>}
          <div
            ref={lastElement}
            style={{ height: 10, backgroundColor: "transparent" }}
          />
          {isChannelVideosLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
        <div className="lg:w-1/6 lg:order-2 color-test order-1 w-full mb-6">
          <FilterNav openNav={openNav} setOpenNav={setOpenNav} title="Канал"/>
          <Collapse open={openNav} className={openNav ? "overflow-visible z-0" : "overflow-hidden"}>
            <ChannelFilter sort={sort} setSort={setSort} search={search} setSearch={setSearch} setOffset={setOffset}
                            channelPlaylistSlug={channelPlaylistSlug} setChannelPLaylistSlug={setChannelPlaylistSlug}
                            channelPlaylists={channelPlaylists} setChannelVideos={setChannelVideos}
                            setDurationRange={setDurationRange} durationRange={durationRange} defaultDurationRange={defaultDurationRange}/>
            {[search, sort, channelPlaylistSlug].some(item=>item) 
            && 
            <div className="flex justify-center items-center">
              <div className="lg:my-5 lg:mt-10 mt-4 cursor-pointer border-2 p-2 hover:bg-st88-secondary" onClick={resetFilter}>Сбросить</div>
            </div>
            }
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Channel;
