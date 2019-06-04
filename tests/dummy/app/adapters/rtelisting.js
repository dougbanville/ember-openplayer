import DS from "ember-data";
import moment from "moment";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";

export default DS.RESTSerializer.extend({
  ajax: service(),
  stations: service(),

  query(store, type, query) {
    let path = "";
    //!Dirty no good hack to set the id to radio one so as
    //! not to break polling
    if (query.station_id === 13) {
      query.station_id = 9;
    }
    let timestamp = moment().unix();
    timestamp = Math.floor(timestamp / 30) * 30;
    if (query.path === "delta") {
      path = `delta/${timestamp}/`;
    } else {
      path = `${query.path}/`;
    }
    let url = `${ENV.feedsUrl}/rtelistings/cal/${
      query.station_id
    }/${path}?callback=${ENV.jsonpCallback}`;
    return this.ajax
      .request(url, {
        dataType: "jsonp"
        //jsonpCallback:ENV.jsonpCallback
      })
      .then(r => {
        this.stations.setAdapterError(false);
        return r;
      })
      .catch(() => {
        this.stations.setAdapterError(true);
      });
  }
});
