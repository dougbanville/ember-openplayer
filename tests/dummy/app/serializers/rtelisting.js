import DS from "ember-data";
import moment from "moment";
export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload) {
      payload.forEach(obj => {
        //need to change the field names to match the NEW api
        // obj.start = moment.tz(obj.fields.progdate, "Europe/Dublin").format();
        // obj.end = moment.tz(obj.fields.progenddate, "Europe/Dublin").format();

        obj.start = moment.tz(obj.fields.progdate, "Europe/Dublin").format();
        obj.end = moment.tz(obj.fields.progenddate, "Europe/Dublin").format();

        obj.id = obj.fields.channelid;

        if (obj.fields.thumbnail) {
          obj.thumbnail = obj.fields.thumbnail.replace("http://", "https://");
        } else {
          obj.thumbnail = false;
        }
        if (obj.fields.imageref) {
          obj.image = obj.fields.imageref.replace("http://", "https://");
        }
        obj.station_name = obj.fields.channel;
        obj.listingid = obj.fields.listingid;
        obj.channel = obj.fields.channel;
        obj.title = obj.fields.progname;
        obj.channelid = obj.fields.channelid;
        obj.description = obj.fields.description;
        obj.homepage = obj.fields.homepage;
        obj.has_previous = obj.fields.has_previous;
        obj.programmeurl = obj.fields.programmeurl;
        obj.piaId = obj.fields.listingid;
        obj.itemid = obj.fields.itemid;
        obj.url = obj.fields.programmeurl;
        obj.duration = obj.fields.duration / 1000.0;
      });
    } else {
      //!in an attempt to stop errors set an empty object
      payload = [
        {
          id: 0,
          model: "schedules.listingview",
          fields: {}
        }
      ];
    }

    payload = {
      rtelistings: payload
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
