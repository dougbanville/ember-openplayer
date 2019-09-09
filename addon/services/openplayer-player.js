import Service from "@ember/service";

export default Service.extend({
  isPlaying: false,
  isLive: false,
  nowPlaying: {
    stationClass: "radio1",
    title: "RTE Radio One"
  },

  setProperty(property, value) {
    this.set(property, value);
  },

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
  },
  setChangeSrc(change) {
    this.set("changeSrc", change);
  }
});
