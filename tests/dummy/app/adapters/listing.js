import DS from "ember-data";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";
//TODO BETTER ERROR HANDLING
/*
https://feeds.rasset.ie/rteavgen/az/?type=radio&letter=a&format=jsonp&callback=html5radioplayer
https://feeds.rasset.ie/rteavgen/latest/?type=radio&format=jsonp&callback=html5radioplayer
https://feeds.rasset.ie/rteavgen/chart/?type=radio
*/
export default DS.RESTSerializer.extend({
  ajax: service(),

  query(store, type, query) {
    let ql = "";
    let limit = "";
    if (query.letter) {
      ql = `letter=${query.letter}`;
    }
    if (query.searchTerm) {
      ql = `query=${query.searchTerm}`;
    }
    if (query.limit) {
      limit = `&limit=${query.limit}`;
    }
    if (query.id) {
      ql = `itemid=${query.id}`;
    }
    if (query.path === "rteavgen/getplaylist") {
      ql = `id=${query.id}`;
    }
    let url = `${ENV.feedsUrl}/${
      query.path
    }/?${ql}${limit}&type=radio&format=jsonp&callback=html5radioplayer`;
    /*return this.get("ajax").request(url, {
            dataType: "jsonp",
        })*/

    return this.ajax
      .request(url, {
        dataType: "jsonp"
      })
      .catch(function(error) {
        throw error;
      });
  }
});
