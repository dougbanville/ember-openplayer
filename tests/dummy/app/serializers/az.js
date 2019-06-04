import DS from "ember-data";
import { inject as service } from "@ember/service";
import moment from "moment";

export default DS.RESTSerializer.extend({
  stations: service(),

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let ids = this.stations.getStationIds();
    payload.shows.forEach(obj => {
      obj.id = obj.itemid;
      //obj.id = obj.itemid;
      if (obj.channelid < 1) {
        obj.channelid = 9;
      }
      obj.station_name = obj.channel;
      obj.listingid = obj.listingid;
      obj.piaId = obj.pia_id;
      obj.description = obj.description;
      obj.homepage = obj.homepage;
      obj.has_previous = obj.has_previous;
      obj.programmeurl = obj.programmeurl;
      obj.image = `${obj.thumbnail}`;
      obj.start = moment.tz(obj.published, "Europe/Dublin").format();
      obj.duration = obj.duration / 1000.0;
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
      az: newPayload
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
