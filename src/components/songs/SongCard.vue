<template>
  <div class="song-card">
    <div class="d-flex">
      <div class="song-image d-flex align-items-center">
        <div class="song-index" v-if="index">{{ index }}.</div>
        <v-img :lazy-src="cover" fluid :src="cover" class="fill-height rounded">
          <!-- <div class="play-btn" @click="play">
            <v-btn icon fab x-small>
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </div> -->
          <play-button
            class="play-btn"
            :height="30"
            :width="30"
            :colors="playBtnColors"
            @play="play"
            :playing="songIsPlaying"
          />
        </v-img>
      </div>
      <v-row :class="`song-details ${index ? 'ml-6' : 'pl-3'}`">
        <v-col cols="7" sm="5">
          <div :class="`song-title fill-width${currentSong ? ' playing' : ''}`">
            {{ song.title }}
          </div>
          <div class="song-artist d-flex align-items-center">
            <router-link to="/">{{ song.artist }}</router-link>
            <div class="ml-3" v-if="songIsPlaying">
              <img
                :src="require('@/assets/equaliser-animated-green.gif')"
                alt="playing"
                height="10"
              />
            </div>
          </div>
        </v-col>

        <v-col sm="3" md="3" class="text-center album d-none d-sm-flex">
          <router-link to="/"> {{ song.album }} </router-link>
        </v-col>

        <v-col sm="2" cols="2" class="d-flex align-items-center time pt-6">
          {{ duration }}
        </v-col>

        <v-col
          sm="2"
          cols="3"
          class="text-right d-flex actions pt-4 pr-0 pr-sm-3"
        >
          <v-btn icon class="like d-none d-sm-flex">
            <favourite-button
              @favourite="toggleFavourite"
              :isFavourite="isFavourite"
            />
          </v-btn>
          <v-btn icon class="">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import FavouriteButton from "../player/controls/FavouriteButton.vue";
import PlayButton from "../player/controls/PlayButton.vue";
export default {
  components: { PlayButton, FavouriteButton },
  name: "SongCard",
  props: {
    song: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      height: 200,
      width: 200,
    };
  },
  computed: {
    ...mapGetters("player", ["isPlaying", "currentPlaying"]),
    cover() {
      return this.song.cover
        .replace("{w}", this.width)
        .replace("{h}", this.height);
    },
    duration() {
      return this.msToTime(this.song.duration);
    },
    playBtnColors() {
      return {
        dark: {
          color: "#fff",
          background: "#772bfb",
        },
        light: {
          color: "#fff",
          background: "#772bfb",
        },
      };
    },
    currentSong() {
      return this.song.id == this.currentPlaying.id;
    },
    songIsPlaying() {
      return this.isPlaying && this.currentSong;
    },
    isFavourite() {
      return this.$store.getters["isSongFavourite"](this.song.id);
    },
  },
  methods: {
    play() {
      if (this.song.id == this.currentPlaying.id) {
        this.$store.dispatch("player/setIsPlaying", {
          isPlaying: !this.isPlaying,
        });
        return;
      }
      this.$store.dispatch("player/play", {
        song: this.song,
        collection: "recent-songs",
      });
    },
    toggleFavourite() {
      if (this.song.id) {
        this.$store.dispatch("toggleFavouriteSong", {
          songId: this.song.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.song-card {
  padding: 4px 10px 4px 3px;

  @media (max-width: 576px) {
    padding-right: 4px;
  }
  .song-index {
    flex: 0 0 auto;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }

  margin-bottom: 15px;
  border-radius: 3px;
  .song-image {
    height: 50px;
    width: 50px;
    position: relative;
    .play-btn {
      position: absolute;
      opacity: 0;
      transition: opacity 0.3s;
      top: 8px;
      left: 8px;
      button {
        height: 30px;
        width: 30px;
        font-size: 16px;
        background: #772bfb;
        color: #ffffff;
      }
    }
  }
  .song-details {
    white-space: nowrap;
    overflow: hidden;
    .song-title {
      font-size: 15px;
      font-weight: 450;
      overflow: hidden;
      text-overflow: ellipsis;
      &.playing {
        color: #1db954;
      }
    }
    .time {
      font-size: 13px;
      color: rgb(185, 169, 169);
      padding-top: 20px;
    }
    .album {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        font-size: 14px;
        color: rgb(179, 179, 179);
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        &:hover {
          text-decoration: underline;
        }
      }
      padding-top: 24px;
    }
    .song-artist a {
      text-decoration: none;
      font-size: 12px;
      color: rgb(179, 179, 179);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }

    .actions {
      .like {
        opacity: 0;
        transition: opacity 0.2s;
      }
    }
  }
  &:hover {
    .actions .like,
    .play-btn {
      opacity: 1;
    }
  }
}

.theme--dark {
  .song-card:hover {
    background-color: rgb(40, 40, 40);
  }
}

.theme--light {
  .song-card:hover {
    background-color: rgb(230, 230, 230);
  }
}
</style>