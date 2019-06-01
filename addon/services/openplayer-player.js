import Service from "@ember/service";

export default Service.extend({
  setPlayer(player) {
    this.set("player", player);
  },
  setTime(time) {
    console.log(`setting time to ${time}`);
    this.set("currentTime", time);
  },
  setNowPlaying(model) {
    this.set("nowPlaying", model);
  }
});
