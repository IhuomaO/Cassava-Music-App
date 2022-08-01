import { extractPlaylists, extractSongs } from "../../helpers";
import { search } from "../../helpers/apple-music";

export default {
  namespaced: true,
  state: {
    keyword: "",
    results: {
      tracks: [],
      albums: [],
      artists: [],
      playlists: [],
    },
    isLoading: false,
  },

  getters: {
    results(state) {
      return state.results;
    },
    keyword(state) {
      return state.keyword;
    },
    resultTracks(state) {
      return state.results.tracks || [];
    },
    resultAlbums(state) {
      return state.results.albums || [];
    },
    resultPlaylists(state) {
      return state.results.playlists || [];
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setKeyword(state, { keyword }) {
      state.keyword = keyword;
    },
    setSearchResults(state, { results }) {
      state.results = Object.assign(results);
    },
    setIsLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    setKeyword({ commit }, { keyword }) {
      commit("setKeyword", { keyword });
    },
    async search({ getters, commit }) {
      commit("setIsLoading", true);
      const data = await search(getters.keyword);
      let results = {
        tracks: [],
        albums: [],
        artists: [],
        playlists: [],
      };

      console.log(data, 'ANSWER');

      results.tracks = extractSongs(data.tracks.items);
      results.playlists = extractPlaylists(data.artists.items);

      commit("setSearchResults", { results });
      commit("setIsLoading", false);
    },
  },
};
