import DS from "ember-data";
import attr from "ember-data/attr";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";
import moment from "moment";

export default DS.Model.extend({
  stations: service(),
  player: service(),
  emberFlowplayer: service(),

  title: attr("string"),
  start: attr("date"),
  end: attr("date"),
  image: attr("string"),
  thumbnail: attr("string"),
  listingid: attr("number"),
  channelid: attr("number"),
  itemid: attr("number"),
  channel: attr("string"),
  description: attr("string"),
  homepage: attr("string"),
  has_previous: attr("boolean"),
  programmeurl: attr("string"),
  programmeid: attr("number"),
  piaId: attr("number"),
  url: attr("string"),
  duration: attr("number"),
  imageLarger: computed("image", function() {
    if (this.image) {
      let img = this.image.replace("http://", "https://");
      img = img.replace("-300", "");
      return img.replace(".jpg", "-900.jpg");
    } else {
      return false;
    }
  }),
  station_name: attr("string"),
  programme_pia_id: attr("number"),
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
  hasDownload: computed("itemid", function() {
    if (this.itemid > 0) {
      return true;
    } else {
      return false;
    }
  }),
  isInPlayer: computed("emberFlowplayer.audioId.[]", "id", function() {
    if (this.emberFlowplayer.audioId == this.id) {
      return true;
    }
  }),
  isPlaying: computed("player.{audioId.[],isPlaying.[]}", "id", function() {
    if (this.emberFlowplayer.audioId == this.id && this.player.isPlaying) {
      return true;
    } else {
      return false;
    }
  }),
  link: computed("stationSlug", "id", "hasDownload", function() {
    if (this.hasDownload) {
      return `/${this.stationSlug}/${this.id}`;
    } else {
      return;
    }
  }),
  showDuration: computed("start.[]", "end.[]", function() {
    return moment(this.end).diff(this.start, "seconds");
  }),
  audioUrl: computed("stationDetail", function() {
    return this.stationDetail.liveStream;
  })
});
