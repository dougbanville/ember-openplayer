import DS from "ember-data";
import moment from "moment";

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.items.forEach(obj => {
      obj.id = obj.itemid;
      //obj.start = obj.published;
      obj.start = moment.tz(obj.published, "Europe/Dublin").format();
      if (obj.ptitle) {
        obj.title = obj.ptitle;
      } else {
        obj.title = obj.description;
      }
      obj.description = obj.mediadescription;
    });

    payload = {
      showitems: payload.items
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
