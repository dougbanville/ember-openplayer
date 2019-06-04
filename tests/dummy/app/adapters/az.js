import DS from "ember-data";
import ENV from "../config/environment";
import { inject as service } from "@ember/service";

export default DS.RESTSerializer.extend({
  ajax: service(),

  query(store, type, query) {
    let url = `${ENV.azUrl}/${query.letter}.json`;
    return this.ajax.request(url).catch(function(error) {
      throw error;
    });
  }
});
