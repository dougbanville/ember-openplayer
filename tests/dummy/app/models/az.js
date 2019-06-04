import DS from "ember-data";
import attr from "ember-data/attr";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";

export default DS.Model.extend({
  stations: service(),
  player: service(),

  station_name: attr("string"),
  channelid: attr("number"),
  description: attr("string"),
  duration: attr("number"),
  episode: attr("string"),
  genre: attr("string"),
  has_previous: attr("string"),
  homepage: attr("string"),
  ismobile: attr("string"),
  ispodcast: attr("string"),
  item_title: attr("string"),
  itemid: attr("number"),
  listingid: attr("string"),
  programmeid: attr("string"),
  programmeurl: attr("string"),
  title: attr("string"),
  published: attr("string"),
  start: attr("string"),
  series: attr("string"),
  showid: attr("string"),
  thumbnail: attr("string"),
  //title: attr("string"),
  url: attr("string"),
  valid_end: attr("string"),
  valid_start: attr("string"),
  audioUrl: attr("string"),
  piaId: attr("number"),
  durationSeconds: computed("duration", function() {
    let duration = this.duration / 1000;
    return duration;
  }),
  //is the current item in the player? see services/player.js
  /*isInPlayer: computed("player.nowPlaying.[]","id",function(){
        if(this.get('player').nowPlaying){
            return this.get('player').nowPlaying.includes(this);
        }

    }),
    */
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
  image: attr("string"),
  imageLarger: computed("image", function() {
    if (this.image) {
      if (this.image.startsWith("https://")) {
        return this.image;
      } else {
        let image = `https://img.rasset.ie/${this.image}-512.jpg`;
        return image;
      }
    } else {
      return false;
    }
  }),
  link: computed("stationSlug", "id", function() {
    return `/${this.stationSlug}/${this.id}`;
  }),
  hasDownload: computed("itemid", function() {
    if (this.itemid > 0) {
      return true;
    } else {
      return false;
    }
  }),
  isPlaying: computed("player.{audioId.[],isPlaying.[]}", "id", function() {
    if (this.player.audioId == this.id && this.player.isPlaying) {
      return true;
    } else {
      return false;
    }
  })
});
