import DS from "ember-data";
import moment from "moment";

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.feedlist.forEach(obj => {
      obj.id = obj.itemid;
      obj.title = `${obj.name} • ${moment(obj.published).format("D MMM YY")}`;
    });

    payload = {
      showCalendar: payload.feedlist
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
