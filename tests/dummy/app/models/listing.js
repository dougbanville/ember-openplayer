import DS from "ember-data";
import attr from "ember-data/attr";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";

export default DS.Model.extend({
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

  hasDownload: computed("itemid", function() {
    if (this.itemid > 0) {
      return true;
    } else {
      return false;
    }
  })
});
