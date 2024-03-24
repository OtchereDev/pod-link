export interface IPodcast {
  id: number;
  podcastGuid: string;
  title: string;
  url: string;
  originalUrl: string;
  link: string;
  description: string;
  author: string;
  ownerName: string;
  image: string;
  artwork: string;
  itunesId: number;
  itunesType: string;
  generator: string;
  explicit: boolean;
  chash: "ad651c60eaaf3344595c0dd0bd787993";
  episodeCount: 19;
  categories: {
    [key: string]: string;
  };
}

export interface IEpisode {
  id: number;
  title: string;
  link: string;
  description: string;
  guid: string;
  datePublished: number;
  datePublishedPretty: string;
  dateCrawled: number;
  enclosureUrl: string;
  enclosureType: string;
  enclosureLength: number;
  duration: number;
  episode: number;
  image: string;
  feedItunesId: number;
  feedImage: string;
  feedId: number;
  feedLanguage: string;
  feedDead: number;
}
