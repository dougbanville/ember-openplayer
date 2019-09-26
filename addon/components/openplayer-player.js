import Component from "@ember/component";
import layout from "../templates/components/openplayer-player";
import OpenPlayer from "openplayerjs";
import { inject as service } from "@ember/service";
//import RangeTouch from "rangetouch";

export default Component.extend({
  layout,

  openplayerPlayer: service(),

  sliding: false,

  didInsertElement() {
    var player = new OpenPlayer("openplayer-player", null, false, {});
    // Don't forget to start the player
    player.init();

    this.openplayerPlayer.setPlayer(player);

    this.htmlPlayer = this.openplayerPlayer.player.getElement();

    this.htmlPlayer.addEventListener("play", () => {
      this.openplayerPlayer.setPlaying(true);
    });

    this.htmlPlayer.addEventListener("pause", () => {
      this.openplayerPlayer.setPlaying(false);
    });

    this.htmlPlayer.addEventListener("ended", function() {
      console.log("Your code when media ends playing");
    });

    this.openplayerPlayer.player.getElement().addEventListener("loadedmetadata", player => {
      //set intial duration but this not reliable on some devices
      this.openplayerPlayer.setProperty("isReady", false);
      this.openplayerPlayer.setProperty("max", parseFloat(player.srcElement.duration));
      this.openplayerPlayer.setProperty("value", player.srcElement.currentTime);
      this.openplayerPlayer.setProperty("step", 0.1);
      this.openplayerPlayer.setProperty("min", 0);
      this.openplayerPlayer.setDuration(player.srcElement.duration);
      this.openplayerPlayer.setProperty("currentTime", parseFloat(player.srcElement.currentTime));
      this.openplayerPlayer.setProperty("isReady", true);
    });

    this.openplayerPlayer.player.getElement().addEventListener("timeupdate", player => {
      this.openplayerPlayer.setProperty("value", player.srcElement.currentTime);
      let percentPlayed = "0%";
      if (!isNaN(player.srcElement.currentTime) && !isNaN(player.srcElement.duration)) {
        percentPlayed = Math.floor((player.srcElement.currentTime / player.srcElement.duration) * 100) + "%";
      }
      this.openplayerPlayer.setProperty("percentPlayed", percentPlayed);
      this.openplayerPlayer.setProperty("currentTime", parseFloat(player.srcElement.currentTime));
      this.openplayerPlayer.setProperty("max", parseFloat(player.srcElement.duration));
    });
  },

  actions: {
    setTime(time) {
      console.log(`setting time to ${time}`);
      this.openplayerPlayer.player.getElement().currentTime = time;
    },
    play() {
      this.openplayerPlayer.player.play();
    },
    pause() {
      this.openplayerPlayer.player.pause();
    },
    changeSource(src) {
      this.openplayerPlayer.player.src = src;
      this.openplayerPlayer.player.play();
    }
  }
});
