import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { motion } from "framer-motion";
import logo from "../assets/Logo.svg";
import profile from "../assets/Profile.svg";
import { songState } from "../state/songState";
import search from "../assets/Frame.svg";
import Songs from "./Songs";
import MusicControls from "./MusicControls";

function Player() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [{ songs, currentSong }, setSongs] = useRecoilState(songState);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("forYou");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchRef = useRef(null);
  const dialogRef = useRef(null);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const setNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    setSongs((prevState) => ({ ...prevState, currentSong: nextSong }));
    setBackgroundColor(nextSong.accent);
  };

  const setPreviousSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIndex];
    setSongs((prevState) => ({ ...prevState, currentSong: prevSong }));
    setBackgroundColor(prevSong.accent);
  };

  useEffect(() => {
    if (!currentSong && songs.length > 0) {
      setSongs((prevState) => ({ ...prevState, currentSong: songs[0] }));
      setBackgroundColor(songs[0].accent);
    }
  }, [songs, currentSong, setSongs]);

  const generateGradient = (color) => {
    return `linear-gradient(108deg, ${color} 2.46%, rgba(0, 0, 0, 0.60) 99.84%), #000`;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
      if (
        isDialogOpen &&
        (!dialogRef.current || !dialogRef.current.contains(event.target))
      ) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);

  return (
    <motion.div
      className="md:grid md:grid-cols-2  justify-center max-w-[130rem] mx-auto min-h-screen font-Inter p-5"
      animate={{ background: generateGradient(backgroundColor) }}
      style={{
        transition: "background 0.4s ease",
      }}
    >
      <div className="flex md:flex-row flex-col">
        <div className="flex md:flex-col flex-row md:w-[16rem]   justify-between">
          <div>
            <img src={logo} alt="logo" width={133.412} className="h-full"></img>
          </div>
          <div>
            <img
              src={profile}
              alt="User Profile"
              width={48}
              className="md:mb-4"
            ></img>
          </div>
        </div>
        <div className="hidden md:flex flex-col mx-auto gap-y-5 w-[27rem]">
          <div className="px-5 flex flex-col gap-y-5">
            <div className="flex flex-row justify-between w-[16.5rem]">
              <div
                className={`text-white select-none text-2xl font-bold leading-loose cursor-pointer ${
                  activeTab === "forYou"
                    ? ""
                    : "opacity-50 transition ease-in-out duration-200"
                }`}
                onClick={() => setActiveTab("forYou")}
              >
                For You
              </div>
              <div
                className={`text-white select-none text-2xl font-bold leading-loose cursor-pointer ${
                  activeTab === "topTracks"
                    ? ""
                    : "opacity-50 transition ease-in-out duration-200"
                }`}
                onClick={() => setActiveTab("topTracks")}
              >
                Top Tracks
              </div>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Song, Artist"
                className="w-full text-white select-none focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 border-2 border-transparent font-Inter px-4 py-2 bg-[#ffffff14] rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img
                  src={search}
                  className="w-8 h-8 opacity-40"
                  alt="icon"
                ></img>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden h-[calc(100vh-10rem)]">
            <Songs
              setBackgroundColor={setBackgroundColor}
              searchQuery={searchQuery}
              activeTab={activeTab}
            />
          </div>
        </div>
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
      </div>
      <div className="flex justify-center md:pt-[4rem] pt-10">
        <div className="md:w-[25rem] w-full h-fit flex-col justify-start items-start gap-8 inline-flex">
          {currentSong && (
            <>
              <div className="flex flex-col gap-y-2">
                <span className="text-white select-none text-3xl font-bold ">
                  {currentSong.name}
                </span>
                <span className="opacity-60 text-white select-none  text-sm leading-normal">
                  {currentSong.artist}
                </span>
              </div>
              <div className="flex w-full flex-col gap-y-3">
                <div className="flex md:w-[25rem] w-full select-none md:h-[25rem] h-[22rem] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://cms.samespace.com/assets/${currentSong.cover}`}
                    alt="Cover"
                    className="w-full h-full object-cover "
                  />
                </div>
                <MusicControls
                  songUrl={currentSong?.url}
                  setNextSong={setNextSong}
                  setPreviousSong={setPreviousSong}
                  setBackgroundColor={setBackgroundColor}
                  toggleDialog={toggleDialog}
                />
                {isDialogOpen && (
                  <div className="fixed md:hidden inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                      ref={dialogRef}
                      className="bg-neutral-900  drop-shadow-lg p-5 border-[1px] border-[#1f2734] shadow-2 hover:shadow-lg w-full mx-5 rounded-xl"
                    >
                      <div className="flex  justify-between max-w-[18.8rem] mx-auto items-center pb-2 text-lg font-bold">
                        <button
                          onClick={() => setActiveTab("forYou")}
                          className={`px-4 py-2 ${
                            activeTab === "forYou"
                              ? "text-white"
                              : "opacity-50 transition text-white ease-in-out duration-200"
                          }`}
                        >
                          For You
                        </button>
                        <button
                          onClick={() => setActiveTab("topTracks")}
                          className={`px-4 py-2 ${
                            activeTab === "topTracks"
                              ? "text-white"
                              : "opacity-50 text-white transition ease-in-out duration-200"
                          }`}
                        >
                          Top Tracks
                        </button>
                      </div>
                      <div className="flex flex-col max-h-64 overflow-auto">
                        {" "}
                        <Songs
                          setBackgroundColor={setBackgroundColor}
                          searchQuery={searchQuery}
                          activeTab={activeTab}
                          clearSearch={() => setSearchQuery("")}
                          onSongSelect={() => setIsDialogOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Player;
