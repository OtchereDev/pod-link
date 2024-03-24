import { SearchIcon } from "~/assets/icons/icons";

export default function Search({
  isOpen,
  toggleOpen,
}: Readonly<{ isOpen?: boolean; toggleOpen: () => void }>) {
  return (
    <div
      className={`${isOpen ? "absolute" : "hidden"} z-10 h-screen min-h-screen w-screen bg-white bg-opacity-95`}
    >
      <div className="mx-auto mt-5 w-full max-w-[992px] px-5 lg:px-0">
        <div className="flex items-center gap-4">
          <div
            className={`mx-auto flex w-full  items-center gap-4 rounded-full border-2 border-[#1b1f23] bg-white px-3 py-2 focus-within:bg-white lg:px-4 lg:py-3`}
          >
            <SearchIcon />
            <input
              type="text"
              name="search"
              className="w-full text-lg outline-none placeholder:text-base placeholder:font-thin"
              placeholder="Search for podcasts"
            />
          </div>
          <button onClick={toggleOpen}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
