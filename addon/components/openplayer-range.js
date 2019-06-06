import Component from "@ember/component";
import layout from "../templates/components/openplayer-range";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import noUiSlider from "nouislider";

export default Component.extend({
  layout,

  tagName: "div",

  elementId: "ember-openplayer-range",

  openplayerPlayer: service(),

  nowPlayingClass: computed("openplayerPlayer.nowPlaying.[]", function() {
    //return this.openplayerPlayer.nowPlaying.stationClass;
  }),

  didInsertElement() {
    var rangeSlider = document.getElementById("ember-openplayer-range");
    console.log(this.value);
    noUiSlider.create(rangeSlider, {
      start: [0],
      value: [this.value],
      connect: [true, false],
      behaviour: "tap-drag",
      keyboardSupport: false,
      range: {
        min: [parseInt(this.value)],
        max: [parseInt(this.max)]
      }
    });

    /*document
      .getElementsByClassName("noUi-connect")[0]
      .classList.add(this.nowPlayingClass);*/

    rangeSlider.noUiSlider.on("slide", () => {
      this.set("sliding", true);
    });
    rangeSlider.noUiSlider.on("end", values => {
      //this.openplayerPlayer.player.seek(values);
      this.set("sliding", false);
    });
    rangeSlider.noUiSlider.on("change", values => {
      //this.openplayerPlayer.player.seek(values);
      this.set("sliding", false);
    });
  },

  didUpdateAttrs() {
    var rangeSlider = document.getElementById("ember-openplayer-range");
    rangeSlider.noUiSlider.set(this.openplayerPlayer.currentTime);
    rangeSlider.noUiSlider.set("range.max", "100");
  },

  actions: {
    sliderEvent(event) {
      if (!this.openplayerPlayer.sliding) {
        this.openplayerPlayer.setSliderState(true);
      }
      this.set("value", event.target.value);
    },
    select(event) {
      //this.openplayerPlayer.player.seek(event.target.value);
      this.openplayerPlayer.setSliderState(false);
    }
  }
});
