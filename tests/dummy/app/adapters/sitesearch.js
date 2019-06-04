import DS from 'ember-data';
import ENV from '../config/environment';
import { inject as service } from '@ember/service'

export default DS.RESTAdapter.extend({

  //http://feeds.rasset.ie/sitesearch/clipperlive/select/?q=*:*&wt=json&sort=published%20desc,section_ordering%20asc&fq=pia_id:19148&fq=published:[2018-08-13T00:00:00Z%20TO%202018-08-13T23:59:00Z] 
  //http://feeds.rasset.ie/sitesearch/clipperlive/select/?q=*:*&wt=json&sort=published%20desc,section_ordering%20asc&fq=pia_id:19148&fq=published:[2018-08-13T00:00:00Z%20TO%202018-08-13T23:59:00Z]

    ajax: service(),

    query(store, type, query) {

        let url;


        if (query.piaId) {
          
          if(query.start == "live"){
            url = `${ENV.feedsUrl}/sitesearch/clipperlive/select/?q=*:*&wt=json&sort=published%20desc,section_ordering%20asc&fq=pia_id:${query.piaId}&json.wrf=${ENV.jsonpCallback}&rows=100`;
          }else{
            url = `${ENV.feedsUrl}/sitesearch/clipperlive/select/?q=*:*&wt=json&sort=published%20desc,section_ordering%20asc&fq=pia_id:${query.piaId}&fq=published:[${query.start}T00:00:00Z%20TO%20${query.end}T23:59:00Z]&json.wrf=${ENV.jsonpCallback}&rows=100`;
          }
          }
          if(query.programmeid){
            url = `${ENV.feedsUrl}/sitesearch/clipperlive/select/?q=*:*&fq=programmeid:${query.programmeid}&sort=published%20desc&wt=json&indent=true&rows=${query.rows}&json.wrf=${ENV.jsonpCallback}&rows=100`;
          }
        return this.ajax.request(url, {
            dataType: "jsonp",
            jsonpCallback: ENV.jsonpCallback,
          });
    }
});