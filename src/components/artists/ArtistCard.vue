<template>
  <router-link to="/">
    <div class="artist-card elevation-2 pa-2" :style="background">
      <v-row class="mx-2">
        <v-row class="playlist-details">
          <v-col cols="10" class="details">
            <div class="artist-name pl-2 pr-1 pt-0 white--text">
              {{ artist.name }}
            </div>
            <div class="artist-name pl-2 pr-1 pt-0 yellow--text">
              {{ artist.name }}
            </div>
          </v-col>
 
          <v-col cols="2">
            <play-button
              class="play-button"
            />
          </v-col>
        </v-row>
      </v-row>
    </div>
  </router-link>
</template>

<script>
import PlayButton from "../player/controls/PlayButton.vue";

export default {
  components: { PlayButton },
  name: "ArtistCard",
  props: {
      artist: {
          type: Object,
          required: false,
      }
  },
  computed: {
    background() {
      return {
        background: `linear-gradient(180deg,transparent,rgba(0,0,0,0.6) 90%,rgba(0,0,0,.8) 100%), 
          url("${this.artist.image}") center center / cover no-repeat`,
        backgroundRepeat: "no-repeat",
        backgroundCenter: "center",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.artist-card {
  background: var(--v-cardBackground-base);
  position: relative;
  height: 200px;
  min-width: 130px;
  width: 100%;
  border-radius: 5px;
  .playlist-details {
    position: absolute;
    bottom: 8px;
    left: 10px;
    width: 93%;
    .play-button {
      font-size: 26px;
      background: #24292F;
      height: 40px;
      width: 40px;
    }
    .details {
      white-space: nowrap;
      overflow: hidden;


      .artist-name {
        font-size: 17px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
   .artist-details-next {
    position: absolute;
    bottom: 15px;
    right: -205px;
    width: 93%;
   }
}
</style>