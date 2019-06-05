import Service from "@ember/service";

export default Service.extend({
  isPlaying: false,
  isLive: false,

  setPlayer(player) {
    this.set("player", player);
  },
  setTime(time) {
    //console.log(`setting time to ${time}`);
    this.set("currentTime", time);
  },
  setPlaying(playing) {
    if (playing) {
      this.set("isPlaying", true);
    } else {
      this.set("isPlaying", false);
    }
  },
  setNowPlaying(model) {
    this.set("nowPlaying", model);
  },
  setDuration(duration) {
    this.set("duration", duration);
  },
  setSliderState(sliding) {
    this.set("sliding", sliding);
  }
});
