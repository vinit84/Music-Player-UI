import React, { useState, useEffect, useRef } from "react";
import vector from "../assets/Vector.svg";

function MusicControls({
  songUrl,
  setNextSong,
  setPreviousSong,
  toggleDialog,
}) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);
  const volumeControlRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);

    const audio = audioRef.current;
    audio.pause();
    audio.load();

    const updateProgress = () => {
      if (audioRef.current.duration > 0) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [songUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(event.target)
      ) {
        setShowVolumeSlider(false);
      }
    };

    if (showVolumeSlider) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeSlider]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => {
      setNextSong();
    };

    audio.addEventListener("ended", handleSongEnd);
    return () => {
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [setNextSong]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeekChange = (event) => {
    const audio = audioRef.current;
    const seekTime = (audio.duration / 100) * event.target.value;
    audio.currentTime = seekTime;
    setProgress(event.target.value);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  return (
    <div className="music-controls">
      <audio ref={audioRef} src={songUrl} />

      <div className="flex flex-col gap-y-6">
        <div className="w-full flex items-center mt-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeekChange}
            className="seeker hover:opacity-100 opacity-70 h-1.5 w-full cursor-pointer rounded-full  "
            style={{
              background: `linear-gradient(to right, #FFF 0%, #FFF ${progress}%, #333 ${progress}%, #333 100%)`,
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-12 h-12 bg-[#FFFFFF1A] rounded-full flex items-center justify-center">
            <button onClick={toggleDialog}>
              <div className="w-6 h-6 relative">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.20002 12C7.20002 12.6365 6.94717 13.2469 6.49708 13.697C6.04699 14.1471 5.43654 14.4 4.80002 14.4C4.1635 14.4 3.55306 14.1471 3.10297 13.697C2.65288 13.2469 2.40002 12.6365 2.40002 12C2.40002 11.3635 2.65288 10.753 3.10297 10.3029C3.55306 9.85283 4.1635 9.59998 4.80002 9.59998C5.43654 9.59998 6.04699 9.85283 6.49708 10.3029C6.94717 10.753 7.20002 11.3635 7.20002 12ZM14.4 12C14.4 12.6365 14.1472 13.2469 13.6971 13.697C13.247 14.1471 12.6365 14.4 12 14.4C11.3635 14.4 10.7531 14.1471 10.303 13.697C9.85288 13.2469 9.60002 12.6365 9.60002 12C9.60002 11.3635 9.85288 10.753 10.303 10.3029C10.7531 9.85283 11.3635 9.59998 12 9.59998C12.6365 9.59998 13.247 9.85283 13.6971 10.3029C14.1472 10.753 14.4 11.3635 14.4 12ZM19.2 14.4C19.8365 14.4 20.447 14.1471 20.8971 13.697C21.3472 13.2469 21.6 12.6365 21.6 12C21.6 11.3635 21.3472 10.753 20.8971 10.3029C20.447 9.85283 19.8365 9.59998 19.2 9.59998C18.5635 9.59998 17.9531 9.85283 17.503 10.3029C17.0529 10.753 16.8 11.3635 16.8 12C16.8 12.6365 17.0529 13.2469 17.503 13.697C17.9531 14.1471 18.5635 14.4 19.2 14.4Z"
                    fill="white"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="flex flex-row justify-between items-center gap-5">
            <button
              onClick={() => {
                setPreviousSong();
              }}
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M24.712 8.38937C24.9529 8.2286 25.233 8.13627 25.5223 8.12222C25.8117 8.10816 26.0994 8.17292 26.3548 8.30957C26.6102 8.44623 26.8237 8.64966 26.9726 8.89816C27.1214 9.14665 27.2 9.4309 27.2 9.72057V22.5206C27.2 22.8102 27.1214 23.0945 26.9726 23.343C26.8237 23.5915 26.6102 23.7949 26.3548 23.9316C26.0994 24.0682 25.8117 24.133 25.5223 24.1189C25.233 24.1049 24.9529 24.0125 24.712 23.8518L16 18.0438V22.5206C16 22.8102 15.9214 23.0945 15.7726 23.343C15.6237 23.5915 15.4102 23.7949 15.1548 23.9316C14.8994 24.0682 14.6117 24.133 14.3223 24.1189C14.033 24.1049 13.7529 24.0125 13.512 23.8518L3.91195 17.4518C3.69282 17.3056 3.51315 17.1077 3.38888 16.8755C3.26462 16.6433 3.19959 16.3839 3.19959 16.1206C3.19959 15.8572 3.26462 15.5979 3.38888 15.3657C3.51315 15.1334 3.69282 14.9355 3.91195 14.7894L13.512 8.38937C13.7529 8.2286 14.033 8.13627 14.3223 8.12222C14.6117 8.10816 14.8994 8.17292 15.1548 8.30957C15.4102 8.44623 15.6237 8.64966 15.7726 8.89816C15.9214 9.14665 16 9.4309 16 9.72057V14.1974L24.712 8.38937Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>

            <div
              className="w-12 h-12 bg-white cursor-pointer rounded-full flex items-center justify-center"
              onClick={togglePlayPause}
            >
              <div className="w-3.5 relative justify-center cursor-pointer">
                {isPlaying ? (
                  <svg
                    width="15"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.87128 20.1205H4.72956C5.96117 20.1205 6.5886 19.4918 6.5886 18.2579V1.99476C6.5886 0.760763 5.96117 0.155408 4.72956 0.120483H1.87128C0.628049 0.120483 0.000622513 0.760763 0.000622513 1.99476V18.2579C-0.0226155 19.4918 0.604811 20.1205 1.87128 20.1205ZM11.2711 20.1205H14.141C15.3726 20.1205 16 19.4918 16 18.2579V1.99476C16 0.760763 15.3726 0.120483 14.141 0.120483H11.2711C10.0394 0.120483 9.41202 0.760763 9.41202 1.99476V18.2579C9.41202 19.4918 10.0162 20.1205 11.2711 20.1205Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7663 7.76028C17.6057 8.94087 17.6057 11.6291 15.7663 12.8097L5.04538 19.6907C3.04874 20.9722 0.424951 19.5385 0.424951 17.1659V3.40405C0.424951 1.03154 3.04874 -0.402162 5.04538 0.879331L15.7663 7.76028Z"
                      fill="black"
                    />
                  </svg>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setNextSong();
              }}
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6">
                  <path
                    d="M7.28805 8.38937C7.04709 8.2286 6.767 8.13627 6.47768 8.12222C6.18835 8.10816 5.90063 8.17292 5.64522 8.30957C5.38982 8.44623 5.1763 8.64966 5.02745 8.89816C4.8786 9.14665 4.80001 9.4309 4.80005 9.72057V22.5206C4.80001 22.8102 4.8786 23.0945 5.02745 23.343C5.1763 23.5915 5.38982 23.7949 5.64522 23.9316C5.90063 24.0682 6.18835 24.133 6.47768 24.1189C6.767 24.1049 7.04709 24.0125 7.28805 23.8518L16 18.0438V22.5206C16 22.8102 16.0786 23.0945 16.2274 23.343C16.3763 23.5915 16.5898 23.7949 16.8452 23.9316C17.1006 24.0682 17.3883 24.133 17.6777 24.1189C17.967 24.1049 18.2471 24.0125 18.488 23.8518L28.088 17.4518C28.3072 17.3056 28.4869 17.1077 28.6111 16.8755C28.7354 16.6433 28.8004 16.3839 28.8004 16.1206C28.8004 15.8572 28.7354 15.5979 28.6111 15.3657C28.4869 15.1334 28.3072 14.9355 28.088 14.7894L18.488 8.38937C18.2471 8.2286 17.967 8.13627 17.6777 8.12222C17.3883 8.10816 17.1006 8.17292 16.8452 8.30957C16.5898 8.44623 16.3763 8.64966 16.2274 8.89816C16.0786 9.14665 16 9.4309 16 9.72057V14.1974L7.28805 8.38937Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          </div>

          <div
            className="w-12 h-12 bg-[#FFFFFF1A] cursor-pointer rounded-full flex items-center justify-center"
            onClick={toggleVolumeSlider}
            ref={volumeControlRef}
          >
            <div className="relative cursor-pointer">
              <img src={vector} className="select-none" alt="Volume Control" />
              {showVolumeSlider && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="md:w-24 w-16 block absolute volume-slider bottom-full  transform md:translate-y-[1rem] translate-y-14 md:translate-x-10 -translate-x-6"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicControls;
