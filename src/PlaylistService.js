const { Pool } = require('pg');

/* eslint no-underscore-dangle: 0 */
class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    const result = await this._pool.query({
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      INNER JOIN users ON playlists.owner = users.id
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      WHERE playlists.owner = $1 OR collaborations.user_id = $1`,
      values: [userId]
    };);

    return result.rows;
  }
}

module.exports = PlaylistService;
