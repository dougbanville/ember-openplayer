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

    this.openplayerPlayer.player.getElement().addEventListener("play", function() {
      console.log("ready");
    });

    this.openplayerPlayer.player.getElement().addEventListener("timeupdate", player => {
      this.openplayerPlayer.setTime(player.srcElement.currentTime);
    });

    this.openplayerPlayer.player.getElement().addEventListener("ended", function() {
      console.log("Your code when media ends playing");
    });
  },

  actions: {
    setTime(time) {
      console.log(time);
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
