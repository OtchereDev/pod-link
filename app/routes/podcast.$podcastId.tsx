import { useParams } from "@remix-run/react";
import { useState } from "react";

import {
  ChevronDown,
  Play,
  PlayIcon,
  ReplayBack,
  ReplayForward,
  SearchIcon,
} from "~/assets/icons/icons";
import SpotifyIcon from "~/assets/icons/spotify.svg";
import AppleIcon from "~/assets/icons/apple.svg";
import GooglePodcast from "~/assets/icons/google.svg";
import Overcast from "~/assets/icons/overcast.svg";
import PodcastAddict from "~/assets/icons/podcastaddict.svg";
import PocketCast from "~/assets/icons/pocketcast.svg";
import Castbox from "~/assets/icons/castbox.svg";
import Stitcher from "~/assets/icons/stitcher.svg";
import Podbean from "~/assets/icons/podbean.svg";
import IHeart from "~/assets/icons/iheartradio.svg";
import Playerfm from "~/assets/icons/playerfm.svg";
import RepublicRadio from "~/assets/icons/republicradio.svg";
import PodcastRepublic from "~/assets/icons/podrepublicfm.svg";
import Castro from "~/assets/icons/castro.svg";
import RSS from "~/assets/icons/rss.svg";
import Share from "~/components/details/Share";
import Search from "~/components/details/Search";

const icons = [
  AppleIcon,
  SpotifyIcon,
  GooglePodcast,
  Overcast,
  PodcastAddict,
  PocketCast,
  Castbox,
  Stitcher,
  Podbean,
  IHeart,
  Playerfm,
  PodcastRepublic,
  Castro,
  RepublicRadio,
  RSS,
];

export default function Index() {
  const params = useParams();
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const toggleShare = () => {
    setOpenShare((iso) => !iso);
  };

  const toggleSearch = () => {
    setOpenSearch((search) => !search);
  };

  const playMusic = () => {
    setShowFullScreen(true);
  };
  return (
    <main className="flex h-screen min-h-screen flex-col">
      <nav className="relative flex items-center justify-between bg-white px-4 py-4">
        <p className="text-lg font-semibold">pod.link/{params.podcastId}</p>

        <div className="flex gap-3">
          <button className="px-3" onClick={toggleShare}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.76 7.947l-.96.96c-.426.427-1.066.427-1.28.107a1.031 1.031 0 010-1.494l3.2-3.2a1.031 1.031 0 011.494 0l3.2 3.2a1.032 1.032 0 010 1.494 1.031 1.031 0 01-1.494 0l-.96-.96c-.106-.107-.213-.107-.32-.107a.23.23 0 00-.213.213v5.227c0 .64-.427 1.067-1.067 1.067-.64 0-1.066-.427-1.066-1.067V8.054a.23.23 0 00-.214-.214c-.106 0-.213 0-.32.107zM6.494 19.254c1.493 1.6 3.733 1.706 5.76 1.706 2.026 0 4.266-.106 5.76-1.706 1.386-1.494 1.493-3.627 1.493-5.44 0-.64-.427-1.067-1.067-1.067-.64 0-1.066.427-1.066 1.067 0 1.386-.107 2.986-.96 3.946-.854.96-2.667 1.067-4.16 1.067-1.494 0-3.307-.107-4.16-1.067-.854-.96-.96-2.56-.96-3.946 0-.64-.427-1.067-1.067-1.067-.64 0-1.067.427-1.067 1.067 0 1.813.107 3.946 1.494 5.44z"
                fill="#db70fc"
              ></path>
            </svg>
          </button>
          <button onClick={toggleSearch}>
            <SearchIcon />
          </button>
        </div>

        <Share isOpen={openShare} toggleShare={toggleShare} />
      </nav>
      <Search toggleOpen={toggleSearch} isOpen={openSearch} />

      <div
        className={` grid flex-1 grid-rows-[250px,auto] lg:mx-auto lg:max-w-[992px] lg:grid-cols-[304px,auto] lg:grid-rows-1 lg:gap-[48px] ${showFullScreen ? "overflow-hidden" : "overflow-scroll pt-5"}`}
      >
        <div className="flex justify-center">
          <div className="h-[224px] w-[224px] overflow-hidden rounded-3xl lg:h-[304px] lg:w-[304px]">
            <img
              src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/34510591/34510591-1668985643962-0a01031ddd6e2.jpg"
              alt="banner"
              className="object-fill"
            />
          </div>
        </div>
        <div className="px-4 pt-4 lg:pt-0">
          <h1 className="text-4xl font-medium text-[#1b1f23] lg:text-5xl">
            Kikie’s_Tales
          </h1>
          <div className="mt-1 inline-block rounded-full bg-black px-3 py-1 ">
            <p className="text-sm text-white">Bertha Kikie</p>
          </div>

          <p className="mt-3 font-thin ">
            Kikie’s Tales seeks to address the everyday issues of the everyday
            people . Here, you get all the gists to make you smile.
          </p>

          <h3 className="mt-8 text-xl font-semibold text-[#1b1f23]">
            Listen now on
          </h3>

          <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-y-visible overflow-x-scroll px-3 py-4 lg:w-[90%] lg:flex-wrap lg:px-2">
            {icons.map((icon, idx) => (
              <img
                className="w-[52px] flex-1 cursor-pointer hover:scale-[1.1] lg:flex-shrink-0 lg:flex-grow-0"
                src={icon}
                alt="icon"
                key={idx}
              />
            ))}
          </div>

          <h4 className="mt-4 text-lg font-semibold">Episodes</h4>
          <div className="grid w-[90%] grid-cols-[40px,auto] items-start lg:mt-4 lg:gap-3">
            <button className="mx-auto" onClick={playMusic}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#db70fc"
                className="h-9 w-9"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div>
              <h3 className="font-medium">
                Know the difference between your radiographer and your
                radiologist
              </h3>
              <p className="mt-2 line-clamp-3 text-sm font-thin">
                Radiographers and Radiologists work together day in and out but
                have different roles. One is a medical doctor and the other is
                not. I am here to clear your confusion. Thank you. Get in touch
                with me on my email : adinorkiebertha123@gmail.com.
              </p>
              <p className="mt-1 text-sm font-thin lg:mt-2">
                14 Jun 2023 · 8 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => !showFullScreen && setShowFullScreen(true)}
        className={`sticky bottom-0 left-0 w-full rounded-t-3xl bg-[#db70fc] transition-all ${showFullScreen ? "flex h-[92.7dvh] flex-col pb-5 lg:h-[94dvh] lg:pt-4" : "h-[84px] lg:h-0"}`}
      >
        {!showFullScreen && (
          <div className="grid grid-cols-[48px,auto,32px] items-center gap-2 px-5 py-4 lg:hidden">
            <img
              src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/34510591/34510591-1668985643962-0a01031ddd6e2.jpg"
              alt="banner"
              className="h-[48px] w-[48px] rounded-md"
            />
            <div>
              <p className=" line-clamp-1 font-thin">
                Know the difference between your radiographer and your
                radiologist
              </p>
              <p className="font-thin">Kikie’s_Tales</p>
            </div>

            <button>
              <PlayIcon />
            </button>
          </div>
        )}

        {showFullScreen && (
          <>
            <div className="flex w-full items-center justify-center py-2 lg:hidden">
              <ChevronDown
                onClick={() => {
                  setShowFullScreen(false);
                }}
              />
            </div>

            <div className=" relative flex-1 overflow-scroll lg:mx-auto lg:grid lg:max-w-[992px] lg:grid-cols-2 lg:pt-12">
              <button
                onClick={() => {
                  setShowFullScreen(false);
                }}
                className="absolute right-0  hidden h-[40px] w-[40px] items-center justify-center rounded-full bg-[#362d31] lg:flex"
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
                  src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/34510591/34510591-1668985643962-0a01031ddd6e2.jpg"
                  alt="banner"
                  className="mx-auto mt-4 h-[192px] w-[192px] rounded-2xl"
                />
                <div className="relative  mt-6">
                  <div className="absolute -top-[4px] left-0 z-10 h-[32px] w-[40px] bg-[linear-gradient(90deg,rgb(218,113,255),rgba(218,113,255,0))]"></div>
                  <div className="overflow-hidden">
                    <div className="sliding  flex cursor-pointer">
                      <span className=" whitespace-nowrap px-4 text-2xl font-semibold">
                        Know the difference between your radiographer and your
                        radiologist
                      </span>
                      <span className=" whitespace-nowrap  px-4 text-2xl font-semibold">
                        Know the difference between your radiographer and your
                        radiologist
                      </span>
                      <span className=" whitespace-nowrap px-4 text-2xl font-semibold">
                        Know the difference between your radiographer and your
                        radiologist
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-[0] top-0 h-[32px] w-[40px]  bg-[linear-gradient(90deg,rgba(218,113,255,0),rgb(218,113,255))]"></div>
                </div>
                <p className="text-thin text-center text-lg">Kikie's_Tales</p>
                <div className="mt-3 px-3">
                  <div className="h-[4px] w-full cursor-pointer rounded-full bg-[rgb(27,31,35)]  bg-opacity-50 transition-all">
                    <div className="relative h-[4px] w-[20%]  rounded-full bg-[rgb(27,31,35)]">
                      <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] cursor-pointer rounded-full bg-[rgb(27,31,35)]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-6">
                  <button>
                    <ReplayBack className="w-[48px]" />
                  </button>

                  <button>
                    <Play className="w-[56px]" />
                  </button>

                  <button>
                    <ReplayForward className="w-[48px]" />
                  </button>
                </div>
              </div>

              <div className="no-scrollbar overflow-scroll lg:col-span-1 lg:col-start-1 lg:row-start-1">
                <h1 className="hidden text-4xl font-medium text-[#1b1f23] lg:block lg:text-5xl">
                  Kikie’s_Tales
                </h1>
                <div className="mt-1  hidden rounded-full bg-black px-3 py-1 lg:inline-block ">
                  <p className="text-sm text-white">Bertha Kikie</p>
                </div>

                <p className="mt-3 hidden font-thin lg:block ">
                  Kikie’s Tales seeks to address the everyday issues of the
                  everyday people . Here, you get all the gists to make you
                  smile.
                </p>

                <div className="px-3">
                  <h3 className="mt-8 text-xl font-semibold text-[#1b1f23]">
                    Listen now on
                  </h3>

                  <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-y-visible overflow-x-scroll px-3 py-4 lg:max-w-[80%] lg:flex-wrap lg:px-1">
                    {icons.map((icon, idx) => (
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
                  <p>
                    Radiographers and Radiologists work together day in and out
                    but have different roles. One is a medical doctor and the
                    other is not. I am here to clear your confusion. Thank you.
                    Get in touch with me on my email :
                    adinorkiebertha123@gmail.com.
                  </p>
                </div>

                <div className="hidden px-3 lg:block">
                  <h4 className="mt-4 text-lg font-semibold lg:mt-10">
                    Episodes
                  </h4>
                  <div>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="grid w-[90%] grid-cols-[40px,auto] items-start gap-3 rounded-lg p-4  lg:mt-4 lg:gap-3"
                      >
                        <button
                          className="mx-auto flex h-9 w-9 items-center justify-center rounded-full"
                          onClick={playMusic}
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
                          <h3 className="text-lg font-medium ">
                            Know the difference between your radiographer and
                            your radiologist
                          </h3>
                          <p className="mt-2 line-clamp-3 font-thin ">
                            Radiographers and Radiologists work together day in
                            and out but have different roles. One is a medical
                            doctor and the other is not. I am here to clear your
                            confusion. Thank you. Get in touch with me on my
                            email : adinorkiebertha123@gmail.com.
                          </p>
                          <p className="mt-1 font-thin lg:mt-2">
                            14 Jun 2023 · 8 minutes
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="grid w-[90%] grid-cols-[40px,auto] items-start gap-3 rounded-lg bg-[#362d31] p-4  lg:mt-4 lg:gap-3">
                      <button
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#db70fc]"
                        onClick={playMusic}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div>
                        <h3 className="text-lg font-medium text-[#db70fc]">
                          Know the difference between your radiographer and your
                          radiologist
                        </h3>
                        <p className="mt-2 line-clamp-3 font-thin text-[#db70fc]">
                          Radiographers and Radiologists work together day in
                          and out but have different roles. One is a medical
                          doctor and the other is not. I am here to clear your
                          confusion. Thank you. Get in touch with me on my email
                          : adinorkiebertha123@gmail.com.
                        </p>
                        <p className="mt-1 font-thin text-[#db70fc] lg:mt-2">
                          14 Jun 2023 · 8 minutes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
