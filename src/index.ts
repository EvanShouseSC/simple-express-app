import express from 'express';
import { PLAYLISTS } from './data/playlists';
import { PLAYLIST_SONGS } from './data/playlistSongs';
import { SONGS } from './data/songs';

const app = express();
const DEFAULT_PORT = 3000;
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/user-playlists', (req, res) => {
  res.json({
    playlists: PLAYLISTS
  });
});

app.post('/user-playlists', (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  if (typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: `Request body must be an object. Request body type: ${typeof req.body}` });
  }

  const { name, author } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Playlist name is required' });
  }

  const highestId = PLAYLISTS.reduce((max, playlist) => Math.max(max, playlist.id), 0);
  const newPlaylist = {
    id: highestId + 1,
    name,
    author: typeof author === 'string' && author.trim() ? author.trim() : 'User'
  };

  PLAYLISTS.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

app.get('/user-playlists/:id', (req, res) => {
  const playlistId = parseInt(req.params.id, 10);
  // Not a good example of querying efficiently
  const playlist = PLAYLISTS.find(p => p.id === playlistId);
  const tracks = PLAYLIST_SONGS.find(t => t.id === playlistId);
  const songs = tracks?.songIds.map(id => SONGS.find(song => song.id === id)) ?? [];

  if (!playlist) {
    return res.status(404).json({ error: 'Playlist not found' });
  }

  res.json({
    ...playlist,
    songs: songs
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${CYAN}http://localhost:${PORT}${RESET}`);
});
