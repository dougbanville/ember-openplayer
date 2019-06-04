import DS from "ember-data";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";

export default DS.Model.extend({
  stations: service(),
  player: service(),

  title: DS.attr("string"),
  channelid: DS.attr("number"),
  itemid: DS.attr("number"),
  stationDetail: computed("stations", "channelid", function() {
    let stationId = this.channelid;
    if (stationId > 0) {
      return this.stations.getStation(stationId);
    } else {
      //sometimes search results give no channelid just give radio1
      return this.stations.getStation(9);
    }
  }),
  stationClass: computed("stationDetail", function() {
    if (this.stationDetail) {
      return this.stationDetail.class_name;
    }
  }),
  stationSlug: computed("stationDetail", function() {
    return this.stationDetail.station_name;
  }),
  stationColor: computed("stationDetail", function() {
    let color = this.stationDetail.station_color;
    let html = `border-color:${color};`;
    return htmlSafe(html);
  }),
  link: computed("stationSlug", "itemid", function() {
    return `/${this.stationSlug}/${this.itemid}`;
  }),
  isPlaying: computed("player.{audioId.[],playerState.[]}", "id", function() {
    if (this.player.audioId == this.id && this.player.playerState === "play") {
      return true;
    } else {
      return false;
    }
  })
});
