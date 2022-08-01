function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function extractAlbums(albums, limit = 6) {
  let formattedAlbums = albums.map((album) => {
    return {
      id: album.id,
      artist: album.attributes.artistName,
      track_count: album.attributes.trackCount,
      genres: album.attributes.genreNames,
      title: album.attributes.name,
      url: album.attributes.url,
      is_single: album.attributes.isSingle,
      content_rating: album.attributes.contentRating,
      release_date: album.attributes.releaseDate,
      record_label: album.attributes.recordLabel,
      cover: album.attributes.artwork.url,
      copyright: album.attributes.copyright,
    };
  });

  return formattedAlbums.slice(0, limit);
}

function extractSongs(tracks) {
  console.log(tracks)
  let formattedSongs = tracks.map((track) => {
    return {
      id: track.id,
      artist: track.album.artists[0].name,
      album: track.name,
      url: track.album.uri,
      release_date: track.album.release_date,
      duration: track.album.total_tracks,
      cover: track.album.images[0].url,
    };
  });

  return formattedSongs;
}

function extractPlaylists(playlists, limit = 6) {
  let formattedPlaylists = playlists.map((playlist) => {
    return {
      id: playlist.id,
      image: playlist.images[0].url,
      genres: playlist.genres[0],
      followers: playlist.followers.total,
      url: playlist.uri,
      popularity: playlist.popularity,
      description: playlist.name,
    };
  });

  return formattedPlaylists.slice(0, limit);
}

function extractAlbumData(rawAlbum) {
  return {
    id: rawAlbum.id,
    artist: rawAlbum.attributes.artistName,
    cover: rawAlbum.attributes.artwork.url,
    content_rating: rawAlbum.attributes.contentRating,
    copyright: rawAlbum.attributes.copyright,
    genres: rawAlbum.attributes.genreNames,
    is_complete: rawAlbum.attributes.isComplete,
    is_single: rawAlbum.attributes.isSingle,
    name: rawAlbum.attributes.name,
    record_label: rawAlbum.attributes.recordLabel,
    release_date: rawAlbum.attributes.releaseDate,
    track_count: rawAlbum.attributes.trackCount,
    url: rawAlbum.attributes.url,
    is_playing: false,
    tracks: extractSongs(rawAlbum.relationships.tracks.data),
  };
}

function extractPlaylistData(rawPlaylist) {
  return {
    id: rawPlaylist.id,
    cover: rawPlaylist.attributes.artwork.url,
    name: rawPlaylist.attributes.name,
    curator_name: rawPlaylist.attributes.curatorName,
    last_modified: rawPlaylist.attributes.lastModifiedDate,
    description: rawPlaylist.attributes.description,
    is_chart: rawPlaylist.attributes.isChart,
    url: rawPlaylist.attributes.url,
    is_playing: false,
    tracks: extractSongs(rawPlaylist.relationships.tracks.data),
  };
}

function getSafe(fn, defaultVal = null) {
  try {
    return fn();
  } catch (_) {
    return defaultVal;
  }
}

function fillImageDimensions(url, width, height) {
  return url.replace("{w}", width).replace("{h}", height);
}

function debounce (fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

export {
  saveToLocalStorage,
  getFromLocalStorage,
  extractSongs,
  extractAlbums,
  extractPlaylists,
  getSafe,
  fillImageDimensions,
  extractAlbumData,
  extractPlaylistData,
  debounce
};
