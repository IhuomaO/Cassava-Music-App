import axios from "axios";
import qs from 'qs'

const API_BASE_URL = "https://api.spotify.com/v1/";

// const secretID = process.env.VUE_APP_SECRET;
//const clientID = process.env.VUE_APP_CLIENT;
const secretID = "04f0572107dc498782a439491446967d"
const clientID = "cbed38a19d0544e19b586fbc975f9e1e"
let body = qs.stringify({grant_type: 'client_credentials'})
let token;


axios.defaults.baseURL = API_BASE_URL;


function getToken() {
  axios.post('https://accounts.spotify.com/api/token',
          body, {
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + secretID).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then(response => { 
        if ( response.data.access_token) {
          token = response.data.access_token;
          return token;
      }})
      .catch(error => {
          console.log(error.response)
      });
 }

 



function fetchBrowseData(limit) {
  const market = "US,NG";
  return axios
    .get("albums", {
      params: { id: 5000, market, limit },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data.results;
    });
}

function fetchAlbum(albumId) {
  return axios
    .get("catalog/us/albums", {
      params: { ids: albumId },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data.data[0];
    });
}

function fetchPlaylist(playlistId) {
  return axios
    .get("catalog/us/playlists", {
      params: { ids: playlistId },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data.data[0];
    });
}

function search(keyword, limit = 10) {
  const type = "track,artist";
  return axios
    .get("search", {
      params: {
        q: encodeURIComponent(keyword).replace(/%20/g, "+"),
        type,
        limit,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
}

export { fetchBrowseData, fetchAlbum, fetchPlaylist, search, getToken };
