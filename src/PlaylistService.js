const { Pool } = require('pg');

/* eslint no-underscore-dangle: 0 */
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistsId) {
    const result = await this._pool.query({
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistsId],
    });

    return result.rows[0];
  }

  async getSongs(playlistsId) {
    const result = await this._pool.query({
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
      values: [playlistsId],
    });

    return result.rows;
  }
}

module.exports = PlaylistService;
