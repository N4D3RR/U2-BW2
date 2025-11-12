// ID ALBUM
const paramsString = window.location.search
const params = new URLSearchParams(paramsString)
const albumId = params.get("id")

console.log(albumId)

const albumCover = document.getElementById("album-cover")
const albumTitle = document.getElementById("album-title")
const albumDetails = document.getElementById("album-details")
const trackList = document.getElementById("track-list")
const artistImg = document.getElementById("artist-img")

const fetchAlbumData = (id) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    .then((res) => {
      if (res.ok) return res.json()
      else throw new Error("Errore HTTP: " + res.status)
    })
    .then((album) => {
      // HEADER
      albumCover.src = album.cover_big
      albumTitle.textContent = album.title

      // ARTISTA
      albumDetails.innerHTML = `<b>${album.artist.name}</b> • ${
        album.release_date
      } • <b>${album.nb_tracks} brani</b>, ${parseInt(
        album.duration / 60
      )} minuti ${album.duration % 60} secondi`
      artistImg.src = album.artist.picture_small

      // NOME ARTISTA CLICCABILE
      albumDetails.addEventListener("click", () => {
        window.location.assign(`artist.html?id=${album.artist.id}`)
      })

      trackList.innerHTML = ""

      album.tracks.data.forEach((track, index) => {
        const minutes = Math.floor(track.duration / 60)
        const seconds = (track.duration % 60).toString().padStart(2, "0")

        const row = document.createElement("div")
        row.className = "d-flex align-items-center py-2 text-light track-row"
        row.style.cursor = "default"

        //TITOLO
        const left = document.createElement("div")
        left.style.flex = "0 0 60%"
        left.className = "d-flex align-items-center gap-3"

        const trackNumber = document.createElement("span")
        trackNumber.className = "text-secondary small"
        trackNumber.textContent = index + 1

        const titleDiv = document.createElement("div")

        titleDiv.className = "d-flex flex-column"
        const trackTitle = document.createElement("p")
        trackTitle.className = "mb-0 fw-semibold"

        trackTitle.textContent = track.title
        const trackArtist = document.createElement("p")
        trackArtist.className = "mb-0 text-secondary"
        trackArtist.textContent = track.artist.name

        titleDiv.appendChild(trackTitle)
        titleDiv.appendChild(trackArtist)
        left.appendChild(trackNumber)
        left.appendChild(titleDiv)

        // VISUAL
        const views = document.createElement("div")
        views.style.flex = "0 0 25%"
        views.className = "text-secondary text-end small"
        views.textContent = track.rank.toLocaleString()

        //DURATA
        const duration = document.createElement("div")
        duration.style.flex = "0 0 15%"
        duration.className = "text-secondary text-end small"
        duration.textContent = `${minutes}:${seconds}`

        row.appendChild(left)
        row.appendChild(views)
        row.appendChild(duration)

        trackList.appendChild(row)
      })
    })
    .catch((err) => console.error(err))
}

const playPauseBtn = document.getElementById("play-btn")
const pauseBtn = document.querySelector(".bi-pause-circle-fill")
const playBtn = document.getElementById("play")
playPause = () => {
  playBtn.classList.toggle("d-none")

  pauseBtn.classList.toggle("d-none")
}
playTopBtn = document.getElementById("play-btn-top")
playTopBtn.style.cursor = "pointer"
fetchAlbumData(albumId || 75621062)
