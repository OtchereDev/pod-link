import { Link, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { useState } from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";

import http from "~/helper/http";
import { IEpisode, IPodcast } from "~/types/index.types";

import { SearchIcon } from "~/assets/icons/icons";

import Share from "~/components/details/Share";
import Search from "~/components/details/Search";
import { formatDate } from "~/helper/formatTime";
import { Icons } from "~/constant/socials";
import MusicBar from "~/components/details/MusicBar";

export async function loader({ params }: LoaderFunctionArgs) {
  const podcastId = params.podcastId;

  try {
    const response = await http.get<{ feed: IPodcast }>(
      `podcasts/byfeedid?id=${podcastId}&pretty`,
    );
    const podcast = response.data.feed;

    const episodeRes = await http.get<{
      items: IEpisode[];
      count: number;
      query: any;
    }>(`/episodes/byfeedid?id=${podcastId}&pretty`);
    const episodes = episodeRes.data.items;

    return json({ podcast, episodes });
  } catch (error: any) {
    console.log(error);
  }

  return json({ podcast: null, episodes: [] });
}

export default function Index() {
  const { podcastId } = useParams();

  const [showFullScreen, setShowFullScreen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const { podcast, episodes } = useLoaderData<typeof loader>();

  const toggleShare = () => {
    setOpenShare((iso) => !iso);
  };

  const toggleSearch = () => {
    setOpenSearch((search) => !search);
  };

  const toggleFullScreen = () => {
    setShowFullScreen((iso) => !iso);
  };
  return (
    <main className="flex h-screen min-h-screen flex-col">
      <nav className="relative flex items-center justify-between bg-white px-4 py-4">
        <p className="text-lg font-semibold">pod.link/{podcastId}</p>

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
            <img src={podcast?.image} alt="banner" className="object-fill" />
          </div>
        </div>
        <div className="px-4 pt-4 lg:pt-0">
          <h1 className="text-4xl font-medium text-[#1b1f23] lg:text-5xl">
            {podcast?.title}
          </h1>
          <div className="mt-1 inline-block rounded-full bg-black px-3 py-1 ">
            <p className="text-sm text-white">{podcast?.author}</p>
          </div>

          <p className="mt-3 line-clamp-3 font-thin">{podcast?.description}</p>

          <h3 className="mt-8 text-xl font-semibold text-[#1b1f23]">
            Listen now on
          </h3>

          <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-y-visible overflow-x-scroll px-3 py-4 lg:w-[90%] lg:flex-wrap lg:px-2">
            {Icons.map((icon, idx) => (
              <img
                className="w-[52px] flex-1 cursor-pointer hover:scale-[1.1] lg:flex-shrink-0 lg:flex-grow-0"
                src={icon}
                alt="icon"
                key={idx}
              />
            ))}
          </div>

          <h4 className="mt-4 text-lg font-semibold">Episodes</h4>
          <div>
            {episodes.map((episode) => (
              <div className="mt-4 grid w-[90%] grid-cols-[40px,auto] items-start lg:mt-4 lg:gap-3">
                <Link to={`?selected=${episode?.id}`}>
                  <button className="mx-auto" onClick={toggleFullScreen}>
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
                </Link>
                <div>
                  <h3 className="font-medium">{episode?.title}</h3>
                  <p
                    className="mt-2 line-clamp-3 text-sm font-thin"
                    dangerouslySetInnerHTML={{
                      __html: episode?.description ?? "",
                    }}
                  />

                  <p className="mt-1 text-sm font-thin lg:mt-2">
                    14 Jun 2023 · {formatDate(episode?.duration ?? 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MusicBar
        isOpen={showFullScreen}
        toggleOpen={toggleFullScreen}
        episodes={episodes as IEpisode[]}
        podcast={podcast as IPodcast}
      />
    </main>
  );
}
