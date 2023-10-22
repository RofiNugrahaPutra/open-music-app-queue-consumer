/* eslint no-underscore-dangle: 0 */
class Listener {
  constructor(mailSender) {
    // this._playlistService = playlistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistTarget, targetEmail } = JSON.parse(message.content.toString());

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistTarget),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
