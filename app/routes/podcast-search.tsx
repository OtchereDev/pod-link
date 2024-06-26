import { json, LoaderFunctionArgs } from "@remix-run/node";

import http from "~/helper/http";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  if (search) {
    try {
      const response = await http.get<{
        feeds: { id: number; title: string; author: string; image: string }[];
      }>(`search/byterm?q=${search}`);
      const podcasts = response.data.feeds.map((feed) => ({
        id: feed.id,
        title: feed.title,
        author: feed.author,
        image: feed.image,
      }));

      return json({ podcasts });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return json({ podcasts: [] });
}

export type PodcastSearch = typeof loader;
