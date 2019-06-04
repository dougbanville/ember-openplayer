import DS from 'ember-data';
import moment from 'moment';
import ENV from '../config/environment';
import { inject as service } from '@ember/service'

export default DS.RESTSerializer.extend({
    ajax: service(),

    query(store, type, query) {
        let path = "";
        let timestamp = moment().unix();
        if(query.path === "delta"){
            path= `delta/${timestamp}/`;
        }else{
            path= `${query.path}/`;
        }
        let url = `${ENV.feedsUrl}/rtelistings/cal/${query.station_id}/${path}`;
        return this.ajax.request(url, {
            dataType: "jsonp",
            jsonpCallback:ENV.jsonpCallback
        });
    }
});