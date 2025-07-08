export interface PlaylistSong {
  id: number;
  songIds: number[];
}

export const PLAYLIST_SONGS: PlaylistSong[] = [
  { id: 1, songIds: [1, 5, 3] },
  { id: 2, songIds: [1, 8, 11] },
  { id: 3, songIds: [3, 4, 7] },
  { id: 4, songIds: [2, 5, 9] },
  { id: 5, songIds: [1, 2, 10] },
  { id: 6, songIds: [2, 5, 7] },
  { id: 7, songIds: [4, 8, 9] },
  { id: 8, songIds: [5, 6, 7] },
];
