import { useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { formatDate, formatSliderTime } from "~/helper/formatTime";
import { IEpisode, IPodcast } from "~/types/index.types";

import { Icons } from "~/constant/socials";
import {
  PlayIcon,
  ChevronDown,
  ReplayBack,
  Play,
  ReplayForward,
  Pause,
} from "~/assets/icons/icons";

export default function MusicBar({
  isOpen,
  toggleOpen,
  episodes,
  podcast,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  episodes: Array<IEpisode>;
  podcast: IPodcast;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("selected");
  const selectedEpisode = episodes.find((p) => p?.id.toString() == selected);

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const trackPlane = useRef<HTMLDivElement | null>(null);
  const tracker = useRef<HTMLDivElement | null>(null);

  const playPause = () => {
    if (!audioPlayer.current) return;
    const player = audioPlayer.current;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const forwardSeek = () => {
    if (!audioPlayer.current) return;
    audioPlayer.current.currentTime += 15;
  };

  const backwardSeek = () => {
    if (!audioPlayer.current) return;
    audioPlayer.current.currentTime -= 15;
  };

  const openSmallBar = () => {
    if (!isPlaying) playPause();
  };

  const stopPlayer = () => {
    if (!audioPlayer.current) return;
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
    setSearchParams((prev) => {
      prev.delete("selected");
      return prev;
    });
  };

  const listPlayer = (id: string) => {
    setSearchParams((prev) => {
      prev.set("selected", id);
      return prev;
    });
    playPause();
  };

  useEffect(() => {
    if (!audioPlayer.current || !trackPlane.current || !tracker.current) return;
    const player = audioPlayer.current;
    const progressBar = trackPlane.current;
    const progress = tracker.current;

    const currentPlayer = () => {
      let secs = player.currentTime;
      let total = player.duration;

      setCurrentTime(player.currentTime);

      let progressBarWidth = progressBar.offsetWidth;

      let audio_played = (secs / total) * 100;
      let newWidth = progressBarWidth * (audio_played / 100);

      progress.style.width = `${newWidth}px`;
    };

    player.addEventListener("timeupdate", currentPlayer);

    return () => player.removeEventListener("timeupdate", currentPlayer);
  }, []);

  // useEffect(() => {
  //   if (!isPlaying && audioPlayer.current) {
  //     playPause();
  //   }
  // }, [isOpen, audioPlayer]);

  return (
    <div
      onClick={() => !isOpen && toggleOpen()}
      className={`sticky bottom-0 left-0 w-full rounded-t-3xl bg-[#db70fc] transition-all ${isOpen ? "pb-5 " : "h-[84px] lg:h-0"}`}
    >
      <div className={`${!isOpen ? "block" : "hidden"}`}>
        <div className="grid grid-cols-[48px,auto,32px] items-center gap-2 px-5 py-4 lg:hidden">
          <img
            src={episodes[0]?.image}
            alt="banner"
            onClick={openSmallBar}
            className="h-[48px] w-[48px] cursor-pointer rounded-md"
          />
          <div onClick={openSmallBar}>
            <p className=" line-clamp-1 cursor-pointer font-thin">
              {episodes[0]?.title}
            </p>
            <p className="cursor-pointer font-thin">{podcast?.author}</p>
          </div>

          <button
            onClick={() => {
              if (isPlaying) {
                toggleOpen();
                playPause();
              } else {
                openSmallBar();
              }
            }}
          >
            {isPlaying ? <Pause /> : <PlayIcon />}
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "flex flex-col lg:h-[92dvh] lg:pt-4" : "hidden"}`}
      >
        <div className="flex w-full items-center justify-center py-2 lg:hidden">
          <ChevronDown
            onClick={() => {
              toggleOpen();
            }}
          />
        </div>

        <div className=" relative flex-1 overflow-scroll lg:mx-auto lg:grid lg:max-w-[992px] lg:grid-cols-2 lg:pt-12">
          <button
            onClick={() => {
              stopPlayer();
              toggleOpen();
            }}
            className="absolute right-0 top-6  hidden h-[40px] w-[40px] items-center justify-center rounded-full bg-[#362d31] lg:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#db70fc"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="lg:col-span-1 lg:col-start-2 ">
            <img
              src={podcast?.image}
              alt="banner"
              className="mx-auto mt-4 h-[192px] w-[192px] rounded-2xl"
            />
            <div className="relative  mt-6">
              <div className="absolute -top-[4px] left-0 z-10 h-[32px] w-[40px] bg-[linear-gradient(90deg,rgb(218,113,255),rgba(218,113,255,0))]"></div>
              <div className="overflow-hidden">
                <div className="sliding  flex cursor-pointer">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className=" whitespace-nowrap px-4 text-2xl font-semibold"
                    >
                      {selectedEpisode?.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-[0] top-0 h-[32px] w-[40px]  bg-[linear-gradient(90deg,rgba(218,113,255,0),rgb(218,113,255))]"></div>
            </div>
            <p className="text-thin text-center text-lg">{podcast?.author}</p>
            <div>
              <div className="mt-3 px-3">
                <div
                  ref={trackPlane}
                  className="h-[4px] w-full cursor-pointer rounded-full bg-[rgb(27,31,35)]  bg-opacity-50 transition-all"
                >
                  <div
                    ref={tracker}
                    className="relative h-[4px] w-0  rounded-full bg-[rgb(27,31,35)]"
                  >
                    <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] cursor-pointer rounded-full bg-[rgb(27,31,35)]" />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-between px-3 text-xs">
                <p>{formatSliderTime(currentTime, "current")}</p>
                <p>
                  {formatSliderTime(
                    selectedEpisode?.duration ?? 0,
                    "duration",
                    audioPlayer.current?.currentTime,
                  )}
                </p>
              </div>
            </div>
            <audio ref={audioPlayer} src={selectedEpisode?.enclosureUrl} />

            <div className="mt-6 flex items-center justify-center gap-6">
              <button onClick={backwardSeek}>
                <ReplayBack className="w-[48px]" />
              </button>

              <button onClick={playPause}>
                {isPlaying ? (
                  <div className="item-center flex h-[56px] w-[56px] justify-center rounded-full bg-[#1c1f23]">
                    <Pause className="w-[40px] fill-[#db70fc]" />
                  </div>
                ) : (
                  <Play className="w-[56px]" />
                )}
              </button>

              <button onClick={forwardSeek}>
                <ReplayForward className="w-[48px] " />
              </button>
            </div>
          </div>

          <div className="no-scrollbar overflow-scroll lg:col-span-1 lg:col-start-1 lg:row-start-1">
            <h1 className="hidden text-4xl font-medium text-[#1b1f23] lg:block lg:text-5xl">
              {podcast?.title}
            </h1>
            <div className="mt-1  hidden rounded-full bg-black px-3 py-1 lg:inline-block ">
              <p className="text-sm text-white">{podcast?.author}</p>
            </div>

            <p className="mt-3 hidden font-thin lg:block ">{podcast?.title}</p>

            <div className="px-3">
              <h3 className="mt-8 text-xl font-semibold text-[#1b1f23]">
                Listen now on
              </h3>

              <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-y-visible overflow-x-scroll px-3 py-4 lg:max-w-[80%] lg:flex-wrap lg:px-1">
                {Icons.map((icon, idx) => (
                  <img
                    className="w-[48px] flex-1 cursor-pointer hover:scale-[1.1] lg:flex-shrink-0 lg:flex-grow-0"
                    src={icon}
                    alt="icon"
                    key={idx}
                  />
                ))}
              </div>
            </div>

            <div className="px-3 lg:hidden">
              <p className="font-semibold">Description</p>
              <p
                className="line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: selectedEpisode?.description ?? "",
                }}
              />
            </div>

            <div className="hidden px-3 lg:block">
              <h4 className="mt-4 text-lg font-semibold lg:mt-10">Episodes</h4>
              <div>
                {episodes.map((episode) => (
                  <div
                    key={episode?.id}
                    className={`grid w-[90%] grid-cols-[40px,auto] items-start gap-3 rounded-lg p-4  lg:mt-4 lg:gap-3 ${episode?.id.toString() == selected ? "bg-[#362d31]" : ""}`}
                  >
                    <button
                      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${episode?.id.toString() == selected ? "bg-[#db70fc]" : ""}`}
                      onClick={() => listPlayer(episode.id.toString())}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div>
                      <h3
                        className={`text-lg font-medium ${episode?.id.toString() == selected ? "text-[#db70fc]" : ""} `}
                      >
                        {episode?.title}
                      </h3>
                      <p
                        className={`mt-2 line-clamp-3 font-thin ${episode?.id.toString() == selected ? "!text-[#db70fc]" : ""}`}
                        dangerouslySetInnerHTML={{
                          __html: episode?.description ?? "",
                        }}
                      />
                      <p
                        className={`mt-1 font-thin lg:mt-2 ${episode?.id.toString() == selected ? "text-[#db70fc]" : ""}`}
                      >
                        14 Jun 2023 · {formatDate(episode?.duration ?? 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
