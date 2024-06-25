import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { songState } from "../state/songState";
import SongSkeleton from "./Skeleton";

function Songs({
  setBackgroundColor,
  searchQuery,
  activeTab,
  clearSearch,
  onSongSelect,
}) {
  const [{ songs, currentSong }, setSongs] = useRecoilState(songState);
  const [loading, setLoading] = useState(true);
  const [durations, setDurations] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch("https://cms.samespace.com/items/songs")
      .then((response) => response.json())
      .then((data) => {
        const songsWithBgColor = data.data.map((song) => ({
          ...song,
          bgColor: "",
        }));
        setSongs((prevState) => ({
          ...prevState,
          songs: songsWithBgColor,
        }));
        setLoading(false);

        songsWithBgColor.forEach((song) => {
          const audio = new Audio(song.url);
          audio.addEventListener("loadedmetadata", () => {
            setDurations((prevDurations) => ({
              ...prevDurations,
              [song.id]: audio.duration,
            }));
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
        setLoading(false);
      });
  }, [setSongs, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".song-container") &&
        !event.target.closest(".music-controls")
      ) {
        setSongs((prevState) => ({
          ...prevState,
          songs: prevState.songs.map((song) => ({ ...song, bgColor: "" })),
        }));
        setBackgroundColor("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSongs, setBackgroundColor]);

  const handleSongClick = (id) => {
    const clickedSong = songs.find((song) => song.id === id);
    if (clickedSong) {
      setBackgroundColor(clickedSong.accent);
      fetch(`https://cms.samespace.com/items/songs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSongs((prevState) => ({
            ...prevState,
            songs: prevState.songs.map((song) => ({
              ...song,
              bgColor: song.id === id ? "#5a5a5a" : "",
            })),
            currentSong: data.data,
          }));
          clearSearch();
          if (onSongSelect) {
            onSongSelect();
          }
        })
        .catch((error) => console.error("Error fetching song details:", error));
    }
  };

  const filteredSongs = songs.filter((song) => {
    const matchesSearchQuery =
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "forYou" ? !song.top_track : song.top_track;
    return matchesSearchQuery && matchesTab;
  });

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="overflow-y-auto">
      {loading ? (
        <SongSkeleton count={3} />
      ) : filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
          <div
            key={song.id}
            className="flex flex-row select-none cursor-pointer justify-between hover:bg-[#ffffff14] rounded-lg px-5 py-4 font-Inter transition ease-in-out duration-200 song-container"
            style={{ backgroundColor: song.bgColor }}
            onClick={() => handleSongClick(song.id)}
          >
            <div className="flex flex-row gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  alt={`${song.name} album cover`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-lg text-white">{song.name}</span>
                <span className="opacity-60 text-white text-sm">
                  {song.artist}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="opacity-60 font-thin text-white text-lg">
                {durations[song.id]
                  ? formatDuration(durations[song.id])
                  : "Loading..."}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white text-center py-5">No songs found</div>
      )}
    </div>
  );
}

export default Songs;
