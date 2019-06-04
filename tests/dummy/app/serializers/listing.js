import DS from "ember-data";
import { inject as service } from "@ember/service";
import moment from "moment";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default DS.RESTSerializer.extend({
  stations: service(),

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let ids = this.stations.getStationIds();
    payload.shows.forEach(obj => {
      if (obj.id) {
        obj.id = obj.id;
      } else {
        obj.id = obj.itemid;
      }
      //obj.id = obj.itemid;
      if (obj.channelid < 1) {
        obj.channelid = 9;
      }

      if (!isEmpty(obj.playlist)) {
        obj.duration = obj.playlist["0"].duration / 1000.0;
      } else {
        obj.duration = obj.duration / 1000.0;
      }

      if (!isEmpty(obj["media:group"])) {
        obj.audioUrl = obj["media:group"]["0"].hls_server + obj["media:group"]["0"].hls_url;
        obj.audioType = "application/x-mpegurl";
      } else {
        obj.audioUrl = false;
        obj.audioType = "";
      }
      obj.station_name = obj.channel;
      obj.listingid = obj.listingid;
      obj.piaId = obj.pia_id;

      //obj.title = obj.progtitle;
      //obj.channelid = obj.channelid;
      obj.description = obj.description;
      obj.homepage = obj.homepage;
      obj.has_previous = obj.has_previous;
      obj.programmeurl = obj.programmeurl;
      obj.image = `${obj.thumbnail}`;
      obj.published = moment.tz(obj.published, "Europe/Dublin").format();
      obj.start = moment.tz(obj.published, "Europe/Dublin").format();
    });
    //filter out weird channels that don't exist
    let newPayload = payload.shows.filter(r => {
      //! filter results so no items older than date set in stations service
      let s = moment(r.start);
      let startingPoint = moment(this.stations.playBackStart);
      let diff = s.diff(startingPoint, "days");
      if (ids.includes(parseInt(r.channelid)) && diff > 0) {
        return r;
      }
    });

    payload = {
      listing: newPayload
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
