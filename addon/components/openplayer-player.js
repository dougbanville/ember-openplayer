import Component from "@ember/component";
import layout from "../templates/components/openplayer-player";
import OpenPlayer from "openplayerjs";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,

  openplayerPlayer: service(),

  didInsertElement() {
    var player = new OpenPlayer("openplayer-player", null, false, {});
    // Don't forget to start the player
    player.init();

    this.openplayerPlayer.setPlayer(player);

    this.progress = document.getElementById("progress");
    this.progressBar = document.getElementById("progress-bar");

    this.progress.addEventListener("click", e => {
      var pos = (e.pageX - this.progress.offsetLeft) / this.progress.offsetWidth;
      var htmlPlayer = this.openplayerPlayer.player.getElement();
      htmlPlayer.currentTime = pos * htmlPlayer.duration;
    });

    this.openplayerPlayer.player.getElement().addEventListener("loadedmetadata", player => {
      //set intial duration but this not reliable on some devices
      this.progress.setAttribute("max", player.srcElement.duration);
      this.openplayerPlayer.setDuration(player.srcElement.duration);
    });

    this.openplayerPlayer.player.getElement().addEventListener("play", () => {
      this.openplayerPlayer.setPlaying(true);
    });

    this.openplayerPlayer.player.getElement().addEventListener("pause", () => {
      this.openplayerPlayer.setPlaying(false);
    });

    this.openplayerPlayer.player.getElement().addEventListener("timeupdate", player => {
      this.openplayerPlayer.setTime(player.srcElement.currentTime);
      this.progress.setAttribute("max", player.srcElement.duration);
      this.openplayerPlayer.setDuration(player.srcElement.duration);

      this.progress.value = player.srcElement.currentTime;
      this.progressBar.style.width =
        Math.floor((player.srcElement.currentTime / player.srcElement.duration) * 100) + "%";
    });

    this.openplayerPlayer.player.getElement().addEventListener("ended", function() {
      console.log("Your code when media ends playing");
    });
  },

  actions: {
    setTime(time) {
      console.log(time);
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
