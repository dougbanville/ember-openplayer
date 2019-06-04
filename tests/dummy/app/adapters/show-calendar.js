import DS from "ember-data";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
  ajax: service(),

  query(store, type, query) {
    let url = `${
      ENV.feedsUrl
    }/rteavgen/showcalendar/?type=radio&limit=7&piaid=${
      query.piaId
    }&format=json&callback=${ENV.jsonpCallback}`;

    return this.ajax.request(url, {
      dataType: "jsonp",
      jsonpCallback: ENV.jsonpCallback
    });
  }
});
