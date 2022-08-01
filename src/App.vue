<template>
  <div id="app" @keypress.space="spacePause" tabindex="0">
    <v-app>
      <app-bar />
      <side-nav />
      <v-main>
        <router-view />
      </v-main>
      <lyrics-drawer />
    </v-app>
    <audio-player />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AudioPlayer from "./components/player/AudioPlayer.vue";
import LyricsDrawer from "./components/UI/LyricsDrawer.vue";
import { getToken } from  "./helpers/apple-music.js";
export default {
  name: "App",
  components: { AudioPlayer, LyricsDrawer },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("player", ["isPlaying", "currentPlaying"]),
  },
  methods: {
      togglePlay() {
      if (this.currentPlaying.title && this.currentPlaying.artist) {
        this.$store.dispatch("player/setIsPlaying", {
          isPlaying: !this.isPlaying,
        });
      }
    },
    spacePause(e) {
      if (e.target.tagName.toUpperCase() == "INPUT") return;
      this.togglePlay();
      e.preventDefault();
    },
  },
  beforeMount() {
     getToken();
  },
  mounted() {
    this.$store.dispatch("fetchFavourites");
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 2px #202020;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
}

.theme--dark.v-application {
  background: var(--v-background-base) !important;
  ::-webkit-scrollbar {
    width: 11px;
  }

  ::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  ::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 2px #202020;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
  }
}

.theme--light.v-application {
  ::-webkit-scrollbar-track {
    background: #e6e6e6;
    border-left: 1px solid #dadada;
  }

  ::-webkit-scrollbar {
    width: 11px;
  }

  ::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border: solid 2px #e6e6e6;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4c4c4d;
  }
}
.w-100 {
  width: 100%;
}
.align-items-center {
  align-items: center;
}
.align-items-end {
  align-items: flex-end;
}
.justify-content-center {
  justify-content: center;
}
body {
  overflow-x: hidden;
}
</style>