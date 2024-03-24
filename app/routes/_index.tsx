import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";

import { FooterIcon, SearchIcon } from "~/assets/icons/icons";
import { PodcastSearch } from "./podcast-search";

export const meta: MetaFunction = () => {
  return [
    { title: "pod.link | Share a Podcast" },
    { name: "description", content: "Welcome to PodLink!" },
  ];
};

export default function Index() {
  const [isFocused, setIsFocused] = useState(false);
  const search = useFetcher<PodcastSearch>({ key: "pod" });

  return (
    <main
      className={`relative h-screen min-h-screen w-screen overflow-scroll bg-[#db70fc] lg:focus-within:bg-[#db70fc] ${!isFocused && "lg:bg-white"}`}
    >
      <div className="fixed left-0 top-0 px-5 py-3.5">
        <p className="text-2xl font-black text-[#1b1f23]">pod.link</p>
      </div>

      <div className="mt-14 h-full lg:h-auto lg:pt-14">
        <h2 className="mb-5 text-center text-[40px] font-bold lg:mb-0 lg:text-[56px]">
          Share a podcast
        </h2>

        <div
          className={`h-[90%] rounded-t-[30px] bg-white px-4 pt-6 transition-all lg:h-auto lg:bg-transparent lg:pt-12 ${isFocused ? "relative -mt-[18%] h-full lg:mt-0 lg:h-auto" : ""}`}
        >
          <search.Form method="get" action="/podcast-search">
            <div
              className={`mx-auto flex max-w-[928px] items-center gap-4 rounded-full border-2 border-[#1b1f23] px-3 py-2 focus-within:bg-white lg:px-4 lg:py-3 ${isFocused ? "bg-white" : ""}`}
            >
              <SearchIcon />
              <input
                type="text"
                name="search"
                className="w-full text-lg outline-none placeholder:text-base placeholder:font-thin"
                placeholder="Search for podcasts"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => setIsFocused(e.target.value.length > 0)}
                onChange={(e) => {
                  setIsFocused(e.target.value.length > 0);
                  search.submit(e.target.form);
                }}
              />
            </div>
          </search.Form>
          {["loading", "submitting"].includes(search.state) ? (
            <p className="mt-3 text-center">Searching....</p>
          ) : null}
          <div className="mx-auto max-h-[90%] max-w-[928px] overflow-scroll px-2 py-5 lg:p-10 ">
            {search.data?.podcasts.map((podcast) => (
              <div key={podcast.id} className="mb-4 flex items-center gap-4">
                <img
                  className="w-[60px] rounded-lg lg:w-[80px]"
                  src={podcast.image}
                  alt={"Banner"}
                />
                <div>
                  <Link to={`podcast/${podcast.id}`}>
                    <p className="text-lg font-medium">{podcast.title}</p>
                  </Link>
                  <Link to={`podcast/${podcast.id}`}>
                    <p>{podcast.author}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isFocused && (
        <div className="absolute bottom-0 ml-[32px] w-[calc(100%-64px)] max-w-full pb-10 lg:w-full">
          <FooterIcon className="mx-auto w-[70px] lg:w-[100px]" />

          <div className="mt-2 flex justify-center gap-3 font-thin">
            <Link to="/">© 2023 pod.link</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Twitter</Link>
            <Link to="/">Help</Link>
          </div>
        </div>
      )}
    </main>
  );
}
