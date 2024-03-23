import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "pod.link | Share a Podcast" },
    { name: "description", content: "Welcome to PodLink!" },
  ];
};

export default function Index() {
  return (
    <div className="w-screen min-h-screen bg-blue-500 focus-within:bg-[#db70fc] relative">
      <div>
        <p className="font-black text-lg">pod.link</p>
      </div>
    </div>
  );
}
