import DS from "ember-data";
import moment from "moment";

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.response.docs.forEach(obj => {
      //debugger
      obj.id = obj.itemid;
      //obj.title = obj.programme_title;
      obj.start = moment.tz(obj.published, "Europe/Dublin").format();
      obj.duration = obj.duration / 1000.0;
      //obj.published = moment.tz(obj.published, "Europe/Dublin").format();
      //obj.stationid = station_find(obj.channelid);
      //return this._super(...arguments);
    });
    payload = {
      sitesearch: payload.response.docs
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
    //return this._super(...arguments);
  }
});
