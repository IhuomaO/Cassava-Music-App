<template>
  <v-container class="home px-5">
    <div class="top-songs">
      <v-row class="mx-0">
        <v-col md="12" lg="6" class="px-md-3 px-0">
          <div class="pa-md-2 pa-0 mt-7 songs elevation-0">
             <div class="text-h3 font-weight-bold pt-7">Don't stop the<br/> groove</div>
              <v-col cols="12" lg="7" class="px-md-1 px-0">
                  <v-spacer>
                    <div class="text-h7 font-weight-light pt-5">Find new music you love with a search</div>
                  </v-spacer>
                
                <v-btn to="/search" class="text-lowercase mt-4">
                  <v-icon>mdi-magnify</v-icon> <span>Search for album...|</span>
                </v-btn>
              </v-col>
          </div>
        </v-col>
        <v-col md="12" lg="6">
          <div class="text-lg-left">
            <div class="py-3 mt-3 artists fill-width">
              <v-row>
                <v-col cols="12">

                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      class="artist pa-1"
                    >
                      <img :src="require('../assets/splash-image.jpg')" alt="artist" style= "height:420px" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
   
    <div class="top-songs mt-7">
       <v-col cols="12">
          <div class="text-lg-left">
            <div class="text-h5 font-weight-bold pb-3">Popular Albums</div>
            <div
           
            >
              <v-row class="d-flex justify-content-end">
                <v-col cols="12">
                  <v-row v-if="isLoading">
                    <v-col
                      cols="12"
                      sm="4"
                      md="3"
                      lg="4"
                      class="artist pa-1"
                      v-for="n in 4"
                      :key="n"
                    >
                      <artist-skeleton />
                    </v-col>
                  </v-row>

                  <v-row v-else>
                    <v-col
                      cols="12"
                      sm="4"
                      md="3"
                      lg="4"
                      class="artist pa-1"
                      v-for="artist in topArtists"
                      :key="artist.id"
                    >
                      <artist-card :artist="artist" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ArtistCard from "../components/artists/ArtistCard.vue";
import ArtistSkeleton from "../components/artists/ArtistSkeleton.vue";
import { getToken } from  "../helpers/apple-music.js";


export default {
  components: {
    ArtistCard,
    ArtistSkeleton,
  },
  name: "Home",
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["recentSongs", "topAlbums", "topArtists", "topPlaylists"]),
    searchPage() {
      return this.$route.name == "search";
    },
  },
   async beforeMount() {
     this.isLoading = true;
       getToken();
       this.isLoading = false;
   },
};
</script>

<style lang="scss" scoped>
.home{
  margin-bottom: 85px;
}
.songs {
  border-radius: 10px;
  padding-left: 4px;
  padding-right: 4px;
  max-height: 270px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border: none;
  }
  &::-webkit-scrollbar-track {
    background: var(--v-background-base);
    border-left: none;
  }
}
.text-h5 {
  font-size: 20px !important;
  font-weight: 600 !important;
}
.theme--light {
  .text-h5 {
    color: #595959;
  }
}
</style>

<style lang="scss">
.artists:not(.sm) {
  .artist {
    &:nth-child(1) {
      .artist-card {
        border-top-left-radius: 15px;
      }
    }
    &:nth-child(2) {
      .artist-card {
        border-top-right-radius: 15px;
      }
    }

    //
    &:nth-last-child(2):not(:nth-child(even)) {
      .artist-card {
        border-bottom-left-radius: 15px;
      }
    }
    &:last-child:not(:nth-child(odd)) {
      .artist-card {
        border-bottom-right-radius: 15px;
      }
    }

    //
    &:last-child:nth-child(odd) {
      .artist-card {
        border-bottom-left-radius: 15px;
      }
    }
  }
}
.justify-content-end {
  justify-content: end;
}
</style>