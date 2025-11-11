//ID ALBUM
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
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
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

      //nome artista cliccabile che rimanda alla pagina artist.html
      albumDetails.addEventListener("click", () => {
        window.location.assign(`artist.html?id=${album.artist.id}`)
      })
      // Pulisco liste
      trackList.innerHTML = ""
      viewsList.innerHTML = ""
      durationList.innerHTML = ""

      // Creo gli elementi per ogni traccia
      album.tracks.data.forEach((track) => {
        const liTitle = document.createElement("li")
        liTitle.className =
          "d-flex justify-content-between align-items-center py-2"
        liTitle.style.cursor = "pointer"

        const div = document.createElement("div")
        div.className = "d-flex flex-column"

        const trackTitle = document.createElement("p")
        trackTitle.className = "mb-0 fw-bold"
        trackTitle.textContent = track.title

        const trackArtist = document.createElement("p")
        trackArtist.className = "mb-0 text-secondary"
        trackArtist.textContent = track.artist.name

        div.appendChild(trackTitle)
        div.appendChild(trackArtist)
        liTitle.appendChild(div)

        // Views
        const liViews = document.createElement("li")
        liViews.className = "text-secondary py-4"
        liViews.textContent = track.rank

        // Durata
        const liDuration = document.createElement("li")
        const minutes = Math.floor(track.duration / 60)
        const seconds = track.duration % 60
        liDuration.className = "text-secondary py-4"
        liDuration.textContent = `${minutes}:${seconds}`

        // Aggiungo agli elenchi
        trackList.appendChild(liTitle)
        viewsList.appendChild(liViews)
        durationList.appendChild(liDuration)
      })
    })
    .catch((err) => {})
}
fetchAlbumData(albumId || 75621062)
