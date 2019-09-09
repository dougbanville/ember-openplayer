import Component from "@ember/component";
import layout from "../templates/components/rte-play";
import fetchJsonp from "fetch-jsonp";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";

export default Component.extend({
  layout,
  openplayerPlayer: service(),
  ajax: service(),

  playSync: task(function*() {
    let url = `https://feeds.rasset.ie/rteavgen/getplaylist/?format=jsonp&id=${this.audioId}&callback=html5player`;
    let result = yield fetchJsonp(url, {
      jsonpCallbackFunction: "html5player"
    });
    this.set("result", result.json());
  }),

  actions: {
    makeAudioandPlay() {
      let sources = [
        "https://cdn.rasset.ie/manifest/audio/2019/0404/20190404_rteradio1-bitesize-theryantub_c21535005_21535006_261_/manifest.m3u8",
        "https://cdn.rasset.ie/hls-radio/ieradio1/playlist.m3u8"
      ];
      let source = 0;

      if (this.openplayerPlayer.created) {
        console.log("tear it down");
        source = 1;
        var element = document.getElementById("myAudio");
        document.getElementById("audio").removeChild(element);
      }
      let audio = document.createElement("audio");
      audio.setAttribute("id", "myAudio");
      audio.src = sources[source];
      audio.setAttribute("controls", "controls");
      document.getElementById("audio").appendChild(audio);
      this.openplayerPlayer.setCreated(true);
      audio.play();
    },
    play(model) {
      if (this.audioId > 100) {
        this.openplayerPlayer.setProperty("isLive", false);
      }
      this.playSync.perform();
      let sources = ["https://cdn.rasset.ie/hls-radio/ieradio1/playlist.m3u8"];
      let source = 0;
      if (source > 1) {
        source = 0;
      }

      if (this.audioId < 100) {
        //it's live
        this.send("playLive", model);
      } else {
        if (this.isInPlayer) {
          this.emberFlowplayer.player.toggle();
        } else {
          let url = `https://feeds.rasset.ie/rteavgen/getplaylist/?id=${this.audioId}&callback=html5player&format=jsonp`;
          this.ajax
            .request(url, {
              dataType: "jsonp"
            })
            .then(json => {
              let hlsUrl =
                json.shows[0]["media:group"][0].hls_server + json.shows[0]["media:group"][0].hls_url;
              this.set("hlsUrl", hlsUrl);

              this.openplayerPlayer.player.src = this.hlsUrl;
              this.openplayerPlayer.player.play();
              this.openplayerPlayer.setNowPlaying(model);
            })
            .catch(function(ex) {
              alert("Could not find that audio");
            });
        }
      }
    },
    playLive(model) {
      let url = `https://feeds.rasset.ie/livelistings/playlist/?source=rte.ie&platform=webradio&channelid=${this.audioId}`;
      fetchJsonp(url, {
        jsonp: "html5player"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          let hlsUrl = json[0].fullUrl;
          this.set("hlsUrl", hlsUrl);
          this.emberFlowplayer.change(true);
          let audio = [{ type: this.type, src: this.hlsUrl }];
          this.emberFlowplayer.setLive(this.audioId);
          this.emberFlowplayer.player.load({
            sources: audio
          });
          this.emberFlowplayer.setNowPlaying(model);
        })
        .catch(function(ex) {
          alert("couldn't find that live stream");
        });
    },
    pause() {
      this.emberFlowplayer.player.toggle();
    }
  }
});
