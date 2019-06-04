import DS from "ember-data";
import attr from "ember-data/attr";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { htmlSafe } from "@ember/template";

export default DS.Model.extend({
  stations: service(),
  player: service(),

  itemid: attr("number"),
  title: attr("string"),
  start: attr("date"),
  //end: attr('date'),
  image: attr("string"),
  thumbnail: attr("string"),
  channelid: attr("number"),
  description: attr("string"),
  isInPlayer: computed("player.audioId", "id", function() {
    //Model ids are always strings
    if (this.player.audioId == this.id) {
      return true;
    }
  }),
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
  isPlaying: computed("player.{audioId.[],isPlaying.[]}", "id", function() {
    if (this.player.audioId == this.id && this.player.isPlaying) {
      return true;
    } else {
      return false;
    }
  })
});
