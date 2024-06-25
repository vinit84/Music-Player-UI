import React, { useRef, useState } from "react";
import search from "../assets/Frame.svg";
import Songs from "./Songs";

function Searchbar({ setActiveTab, setBackgroundColor, activeTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  return (
    <>
      <div className="relative md:hidden mt-6 w-full">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="w-full text-white select-none focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 border-[1px] border-transparent font-Inter px-4 py-2 bg-[#ffffff14] rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <img src={search} className="w-8 h-8 opacity-40" alt="icon"></img>
        </div>
        {searchQuery && (
          <div
            ref={searchRef}
            className="absolute z-10 w-full bg-neutral-900 drop-shadow-lg border-[1px] border-[#1f2734] shadow-2 hover:shadow-lg mt-2 rounded-lg max-h-64 overflow-auto"
          >
            <Songs
              setBackgroundColor={setBackgroundColor}
              searchQuery={searchQuery}
              activeTab={activeTab}
              clearSearch={() => setSearchQuery("")}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Searchbar;
