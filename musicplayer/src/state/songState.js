import { atom } from 'recoil';

export const songState = atom({
  key: 'songState',
  default: {
    songs: [],
    currentSong: null
  },
});