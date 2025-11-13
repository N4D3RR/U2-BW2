const paramsString = window.location.search
const params = new URLSearchParams(paramsString)
const artistId = params.get("id") || 412

const artistName = document.getElementById("artist-name")
const fans = document.getElementById("monthly-viewers")
const songs = document.getElementById("songs")
const albums = document.getElementById("other-album")
const artistHeader = document.getElementById("artist-header")

const audio = document.getElementById("audio-player")
const progressBar = document.getElementById("progress-bar")

// FUNZIONE AVANZAMENTO PROGRESSBAR
const currentTime = document.getElementById("time")

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100
    progressBar.style.width = `${progress}%`
    progressBar.setAttribute("aria-valuenow", progress)
    console.log(progress)
    const currentMinutes = Math.floor(audio.currentTime / 60)
    const currentSeconds = Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, "0")
    currentTime.innerText = `${currentMinutes}:${currentSeconds}`
  }
})

//FUNZIONE AVANZAMENTO ALLA PRESSIONE DELLA BAR
const progressContainer = progressBar.parentElement

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth
  const clickX = e.offsetX
  const newTime = (clickX / width) * audio.duration
  audio.currentTime = newTime
})

// FUNZIONE PLAY/PAUSE

const pauseBtn = document.getElementById("pause-btn")
const playBtn = document.getElementById("play")
const footerImg = document.getElementById("footer-img")
const footer = document.getElementById("player")
const playBtnTop = document.getElementById("play-btn-top")
const pauseBtnTop = document.getElementById("pause-btn-top")
playPause = () => {
  if (audio.paused) {
    audio.play()
    playBtn.classList.add("d-none")
    playBtnTop.classList.add("d-none")
    pauseBtn.classList.remove("d-none")
    pauseBtnTop.classList.remove("d-none")
    footer.classList.remove("d-none")
  } else {
    audio.pause()
    playBtn.classList.remove("d-none")
    playBtnTop.classList.remove("d-none")
    pauseBtn.classList.add("d-none")
    pauseBtnTop.classList.add("d-none")
  }
}
playTopBtn = document.getElementById("play-btn-top")
playTopBtn.style.cursor = "pointer"

fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
  .then((res) => {
    if (res.ok) return res.json()
    else throw new Error("Errore HTTP: " + res.status)
  })
  .then((artist) => {
    console.log(artist)
    artistName.textContent = artist.name
    fans.textContent = `${artist.nb_fan} ascoltatori mensili `
    artistHeader.style = `background-image: url(${artist.picture_xl}); background-size:cover; background-repeat: no-repeat;`

    //popular songs
    fetch(artist.tracklist)
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error("Errore HTTP: " + res.status)
      })
      .then((tracks) => {
        const topSongs = tracks.data.slice(0, 10)
        console.log(topSongs)

        songs.innerHTML = ""
        topSongs.forEach((track, index) => {
          const li = document.createElement("li")
          li.className =
            "d-flex justify-content-between py-2 align-items-center"
          const minutes = Math.floor(track.duration / 60)
          const seconds = (track.duration % 60).toString().padStart(2, "0")
          const trackNumber = document.createElement("span")
          trackNumber.className = "text-secondary small"
          trackNumber.textContent = index + 1
          li.innerHTML = `${trackNumber.innerText} <img src="${track.album.cover_small}" alt="album-img" class="rounded rounded-3 shadow ms-3">
          <span class="col col-7 ms-2 track-title"> ${track.title}</span>
          <span class="col col-3"> ${track.rank} ascolti</span>
          <span class="col col-1"> ${minutes}:${seconds} </span>`

          const tracksTitle = li.querySelector(".track-title")
          tracksTitle.style.cursor = "pointer"
          tracksTitle.addEventListener("click", () => {
            const footerImg = document.getElementById("footer-img")
            const footerTitle = document.getElementById("footer-track-title")
            const footerArtist = document.getElementById("footer-track-artist")
            const trackDuration = document.getElementById("track-duration")
            footerImg.src = track.album.cover
            footerTitle.textContent = track.title
            footerArtist.textContent = track.artist.name
            const minutes = Math.floor(track.duration / 60)
            const seconds = (track.duration % 60).toString().padStart(2, "0")
            trackDuration.textContent = `${minutes}:${seconds}`
            audio.src = track.preview
            playPause()
          })

          console.log(li)
          songs.appendChild(li)
        })
      })
      .catch((err) => console.error(err))
  })
  .catch((err) => console.error(err))

//popular albums

const topAlbums = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`
fetch(topAlbums)
  .then((res) => {
    if (res.ok) return res.json()
    else throw new Error("Errore HTTP: " + res.status)
  })
  .then((albumData) => {
    console.log(albums)
    const albumList = albumData.data.slice(0, 6)
    albums.innerHTML = ""

    albumList.forEach((album) => {
      const div = document.createElement("div")
      div.className = "col-6 text-center mb-3"
      div.innerHTML = `
        <a href="album.html?id=${album.id}" class="text-decoration-none text-white">
          <img src="${album.cover_medium}" alt="${album.title}" class="img-fluid rounded-3 shadow mb-2">
          <p class="small fw-semibold mb-0">${album.title}</p>
          <p class="small text-secondary">${album.release_date}</p>
        </a>
      `
      albums.appendChild(div)
    })
  })
  .catch((err) => console.error(err))

//BOTTONE FOLLOW
const followBtn = document.querySelector(".btn.btn-primary")

followBtn.addEventListener("click", () => {
  if (!followBtn.classList.contains("btn-outline-light")) {
    followBtn.classList.remove("btn-primary")
    followBtn.classList.add("btn-outline-light")
    followBtn.textContent = "FOLLOWED"
  } else {
    followBtn.classList.remove("btn-outline-light")
    followBtn.classList.add("btn-primary")
    followBtn.textContent = "FOLLOW"
  }
})
