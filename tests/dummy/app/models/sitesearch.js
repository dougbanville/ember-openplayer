import DS from 'ember-data';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default DS.Model.extend({

    stations: service(),
	player: service(),

    title: attr("string"),
    description: attr('string'),
    programmeid: attr("number"),
    teaserimgref: attr("string"),
    showid: attr("number"),
    isshow: attr("boolean"),
    channelid: attr('number'),
    published: attr('date'),
    start: attr('date'),
    programme_title: attr('string'),
    duration: attr('number'),
    section_ordering: attr('number'),
    durationSeconds: computed("duration",function(){
        let duration = this.duration;
        return duration;
    }),
    stationDetail: computed("stations", "channelid", function () {
        let stationId = this.channelid;
        if(stationId > 0){
            return this.stations.getStation(stationId);
        }else{
            //sometimes search results give no channelid just give radio1
            return this.stations.getStation(9);
        }
    }),
    stationClass: computed("stationDetail", function () {
        if(this.stationDetail){
            return this.stationDetail.class_name;
        }
    }),
    stationSlug: computed("stationDetail", function () {
        return this.stationDetail.station_name;
    }),
    stationColor: computed("stationDetail", function () {
        let color = this.stationDetail.station_color;
        let html = `border-color:${color};`;
        return htmlSafe(html);
	}),
    link: computed("id","stationSlug", function(){
        return `/${this.stationSlug}/${this.id}`;
    })




});
