import Component from "@ember/component";
import layout from "../templates/components/openplayer-range";
import RangeTouch from "rangetouch";

export default Component.extend({
  layout,
  duration: 0,

  didReceiveAttrs() {
    let percentage = Math.floor((this.currentTime / this.duration) * 100);
    this.set("percentage", percentage);

    if (!isNaN(this.duration)) {
      this.set("max", this.duration);
    } else {
      this.set("max", 100);
    }
  },

  didInsertElement() {
    const range = new RangeTouch('input[type="range"]', {});
  },

  didRender() {
    this.set("value", `${this.percentage}%`);
  },

  actions: {
    skip(e) {
      let progress = document.getElementsByTagName("progress")[0];
      let newTime = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
      newTime = newTime * this.duration;
      //send the time back to parent component
      this.setTime(newTime);
    },
    setPosition(event) {
      this.setTime(event.srcElement.value);
    }
  }
});
