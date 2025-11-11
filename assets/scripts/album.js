//ID ALBUM
const API = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const paramsString = window.location.search

const params = new URLSearchParams(paramsString)

const albumId = params.get("id")
console.log(albumId)

const albumCover = document.getElementById("album-cover")
const albumTitle = document.getElementById("album-title")
const albumArtist = document.getElementById("album-artist")
const trackList = document.getElementById("track-list")
const viewsList = document.getElementById("views")
const durationList = document.getElementById("duration")
const artistImg = document.getElementById("artist-img")
const albumDate = document.getElementById("album-date")
const albumSongs = document.getElementById("album-songs")

const fetchAlbumData = (id) => {
  fetch(API)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore:", res.status)
      }
    })

    .then((album) => {
      //header
      albumCover.src = album.cover_big
      albumTitle.textContent = album.title
      //artista
      albumArtist.textContent = album.artist.name
      artistImg.src = album.artist.picture_small
      albumDate.textContent = album.release_date + ` •` + ` `
      albumSongs.textContent = album.nb_tracks + " brani," + album.duration
    })
    .catch((err) => {})
}
fetchAlbumData()
