import { useParams } from "@remix-run/react";
import { Facebook, Twitter } from "~/assets/icons/icons";
import { IPodcast } from "~/types/index.types";

export default function Share({
  isOpen,
  toggleShare,
  podcast,
  origin,
}: Readonly<{
  isOpen?: boolean;
  toggleShare: () => void;
  podcast: IPodcast;
  origin: string;
}>) {
  const part = origin.split("/").slice(-1)[0];
  const { podcastId } = useParams();
  const link = `${part}/${podcastId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
  };
  return (
    <div
      className={`right-0 top-full w-full max-w-[423px] ${isOpen ? "absolute" : "hidden"}`}
    >
      <div className=" mx-auto w-[92%] rounded-2xl border-2 border-black bg-white px-3 py-5 lg:p-5">
        <div className="flex justify-between">
          <p className="font-semibold">Share Podcast</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer"
            onClick={toggleShare}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="mt-2 grid grid-cols-[96px,auto] items-center gap-5">
          <img
            className="h-96px w-[96px] flex-1 rounded-xl"
            src={podcast.image}
            alt="icon"
          />

          <div>
            <p className=" font-thin">{podcast.author}</p>
            <p className="text-lg font-semibold">{podcast.title}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <button
            onClick={copyToClipboard}
            className="flex gap-2 rounded-full bg-[#db70fc] px-5 py-2.5 font-semibold"
          >
            <p className={"line-clamp-1 max-w-[90%]"}>{link}</p>
            <p className="font-bold">COPY</p>
          </button>

          <div className="flex gap-2 ">
            <Facebook className="w-[32px]" />
            <Twitter className="w-[32px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
