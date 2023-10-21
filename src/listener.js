/* eslint no-underscore-dangle: 0 */
class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistService.getPlaylists(playlistId);

      const songs = await this._playlistService.getSongs(playlistId);

      const exportedPlaylist = {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          songs: songs.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        },
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(exportedPlaylist),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
