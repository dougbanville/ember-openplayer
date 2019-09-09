import Service from "@ember/service";

export default Service.extend({
  adapterError: false,

  badParams: false,

  playBackStart: "2012-01-01",

  setAdapterError(status) {
    this.set("adapterError", status);
  },

  getStations() {
    return [
      {
        id: 0,
        station_name: "default",
        class_name: "default",
        pia_id: 9,
        clipper_id: 0,
        station_logo: "https://img.rasset.ie/000bd031.jpg",
        title: "RTÉ Radio",
        imageRef: "000681f9",
        station_color: "#46a3d5",
        icecast: "https://av.rasset.ie/av/live/radio/radio1.m3u"
      },
      {
        id: 9,
        station_name: "radio1",
        class_name: "radio1",
        pia_id: 9,
        clipper_id: 45,
        station_logo: "https://img.rasset.ie/000bd031.jpg",
        title: "RTÉ Radio 1",
        imageRef: "000681f9",
        station_color: "#46a3d5",
        icecast: "https://av.rasset.ie/av/live/radio/radio1.m3u"
      },
      {
        id: 1,
        station_name: "2fm",
        pia_id: 1,
        class_name: "twofm",
        clipper_id: 47,
        station_logo: "https://img.rasset.ie/000bd02e.jpg",
        title: "RTÉ 2fm",
        imageRef: "000b9b0c",
        station_color: "#f15a29",
        icecast: "https://av.rasset.ie/av/live/radio/2fm.m3u"
      },
      {
        id: 16,
        station_name: "lyric",
        class_name: "lyric",
        pia_id: 16,
        clipper_id: 48,
        station_logo: "https://img.rasset.ie/000bd037.jpg",
        title: "RTÉ lyric fm",
        imageRef: "00048e0e",
        station_color: "#582e91",
        icecast: "https://av.rasset.ie/av/live/radio/lyric.m3u"
      },
      {
        id: 17,
        station_name: "rnag",
        class_name: "rnag",
        pia_id: 17,
        clipper_id: 49,
        station_logo: "https://img.rasset.ie/000bd03a.jpg",
        title: "RTÉ Raidió na Gaeltachta",
        imageRef: "0008ecfe",
        station_color: "#59923b",
        icecast: "https://av.rasset.ie/av/live/radio/rnag.m3u"
      },
      {
        id: 24,
        station_name: "radio1extra",
        class_name: "radio1extra",
        pia_id: 24,
        clipper_id: 102,
        station_logo: "https://img.rasset.ie/000bd03f.jpg",
        title: "RTÉ Radio 1 Extra",
        imageRef: "0009a0fe",
        station_color: "#0d2d6e",
        icecast: "https://av.rasset.ie/av/live/radio/radio1extra.m3u"
      },
      {
        id: 23,
        station_name: "pulse",
        class_name: "pulse",
        pia_id: 23,
        clipper_id: 50,
        station_logo: "https://img.rasset.ie/000bd03d.jpg",
        title: "Pulse",
        imageRef: "00048e3d",
        station_color: "#dd1936",
        icecast: "https://av.rasset.ie/av/live/radio/pulse.m3u"
      },
      {
        id: 22,
        station_name: "gold",
        class_name: "gold",
        pia_id: 22,
        clipper_id: 53,
        station_logo: "https://img.rasset.ie/000bd035.jpg",
        title: "Gold",
        imageRef: "00048e3b",
        station_color: "#9f7011",
        icecast: "https://av.rasset.ie/av/live/radio/gold.m3u"
      },
      {
        id: 20,
        station_name: "junior",
        class_name: "junior",
        pia_id: 20,
        clipper_id: 54,
        station_logo: "https://img.rasset.ie/000bd03c.jpg",
        title: "RTÉjr Radio",
        imageRef: "#b4d333",
        station_color: "#b4d333",
        icecast: "https://av.rasset.ie/av/live/radio/junior.m3u"
      },
      {
        id: 18,
        station_name: "2xm",
        class_name: "twoxm",
        pia_id: 18,
        clipper_id: 51,
        station_logo: "https://img.rasset.ie/000bd033.jpg",
        title: "2XM",
        imageRef: "00048e38",
        station_color: "#231f20",
        icecast: "https://av.rasset.ie/av/live/radio/2xm.m3u"
      },
      {
        id: 13,
        station_name: "podcasts",
        class_name: "podcasts",
        pia_id: 13,
        clipper_id: 51,
        station_logo: "https://img.rasset.ie/000bd033.jpg",
        title: "Podcasts",
        imageRef: "00048e38",
        station_color: "#ff0135",
        icecast: "https://av.rasset.ie/av/live/radio/2xm.m3u"
      }
    ];
  },

  selectedStation: null,

  getOnAir(stationName) {
    let stations = this.getStations();
    let station = stations.findBy("station_name", stationName);
    if (station) {
      this.set("selectedStation", []);
      this.selectedStation.pushObject(station);
      return station;
    } else {
      station = stations.findBy("station_name", "radio1");
    }
  },

  getStationNumericId(stationId) {
    let stations = this.getStations();
    let station = stations.findBy("station_name", stationId);
    if (station) {
      //if we are given bad url params
      this.set("badParams", false);
      return `${station.id}`;
    } else {
      this.set("badParams", true);
      return 0;
    }
  },

  getStationClass(stationId) {
    let stations = this.getStations();
    if (stationId) {
      let station = stations.findBy("id", stationId);
      if (station) {
        return `${station.class_name}`;
      } else {
        return `radio1`;
      }
    } else {
      return 9;
    }
  },

  getStationSlug(stationId) {
    let stations = this.getStations();
    if (stationId) {
      let station = stations.findBy("id", stationId);
      if (station) {
        return `${station.station_name}`;
      } else {
        return `radio1`;
      }
    } else {
      return "default";
    }
  },

  getStation(stationId) {
    let stations = this.getStations();
    let station = stations.findBy("id", stationId);
    return station;
  },
  getStationIds() {
    let stations = this.getStations();
    let ids = [];
    stations.map(s => {
      ids.push(s.id);
    });
    return ids;
  }
});
