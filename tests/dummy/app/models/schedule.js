import DS from "ember-data";
import attr from "ember-data/attr";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { htmlSafe } from "@ember/template";
import moment from "moment";

export default DS.Model.extend({
  stations: service(),
  player: service(),

  title: attr("string"),
  start: attr("string"),
  end: attr("date"),
  duration: DS.attr("number"),
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
  /*isInPlayer: computed('player.nowPlaying.[]', function(){
        return this.get('player.nowPlaying').includes(this); 
	}),*/
  isInPlayer: computed("player.nowPlaying.[]", "id", function() {
    if (this.player.audioId == this.id) {
      return true;
    }
  }),
  isPlaying: computed("player.{audioId.[],isPlaying.[]}", "id", function() {
    if (this.player.audioId == this.id && this.player.isPlaying) {
      return true;
    } else {
      return false;
    }
  }),
  link: computed("stationSlug", "itemid", "hasDownload", function() {
    if (this.hasDownload) {
      return `/${this.stationSlug}/${this.itemid}`;
    } else {
      return;
    }
  }),
  showDuration: computed("start", "end", function() {
    return moment(this.end).diff(this.start, "seconds");
  })
  /*nowPlaying: Ember.inject.service('now-playing'),
	isInPlayer: Ember.computed('nowPlaying.playback.[]', function() {
		return this.get('nowPlaying.playback').includes(this);
	}),
	playerStatus: Ember.inject.service(),
	isPlaying: Ember.computed('playerStatus.status.[]', function() {
		if (this.get('playerStatus.status') == 'playing') {
			return true;
		} else {
			return false;
		}
    }),
    
	stations: Ember.inject.service(),
	station_name: Ember.computed('channelid', function() {
		var station_name = idtostation(this.get('channelid'));
		return station_name;
	}),
	hls_audio_url: Ember.computed('stations', 'channelid', function() {
		let stationServive = this.get("stations");
		return stationServive.getOnAir(this.get('channelid'));
	}),
	fileType : "audio/mpeg",
    isLive : true
    */
});
