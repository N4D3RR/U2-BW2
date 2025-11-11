//ID ALBUM
const API = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const paramsString = window.location.search

const params = new URLSearchParams(paramsString)

const albumId = params.get("id")
console.log(albumId)

const albumCover = document.getElementById("album-cover")
const albumTitle = document.getElementById("album-title")
const albumDetails = document.getElementById("album-details")
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
      albumDetails.innerHTML = `<b>${album.artist.name}</b> • ${
        album.release_date
      } • <b>${album.nb_tracks} brani</b>, ${parseInt(
        album.duration / 60
      )} minuti ${album.duration % 60} secondi`
      artistImg.src = album.artist.picture_small
    })
    .catch((err) => {})
}
fetchAlbumData()
