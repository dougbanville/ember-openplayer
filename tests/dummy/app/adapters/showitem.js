import DS from "ember-data";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";

export default DS.RESTAdapter.extend({
  ajax: service(),

  query(store, type, query) {
    let url = `https://www.rte.ie/rteavgen/showitems/?piaid=${
      query.piaId
    }&date=${query.start}&type=radio&format=json&&callback=${
      ENV.jsonpCallback
    }`;

    return this.ajax.request(url, {
      dataType: "jsonp",
      jsonpCallback: ENV.jsonpCallback
    });
  }
});
