const c1 = document.querySelectorAll(".album")

const redirectToAlbumPage = (albumId) => {
  const url = `./album.html?id=${albumId}`
  location.assign(url, albumId)
}

c1.forEach((card) => {
  card.style.cursor = "pointer"
  card.addEventListener("click", () => {
    const albumId = card.dataset.albumId //prendo l'id
    window.location.assign(`album.html?id=${albumId}`) //apro album.html con l'id dell'album
  })
})

// play e pausa

const playPauseBtn = document.getElementById("play-btn")

const pauseBtn = document.querySelector(".bi-pause-circle-fill")
const playBtn = document.querySelector(".bi-play-circle-fill")

playPause = () => {
  playBtn.classList.toggle("d-none")

  pauseBtn.classList.toggle("d-none")
}
const bell = document.getElementById("bell")
bell.addEventListener("click", () => {
  bell.classList.toggle("bi-bell")
  bell.classList.toggle("bi-bell-fill")
})
const annuncio = document.getElementById("annuncio")
const hideBtn = document.getElementById("hideBtn")
const restoreDiv = document.getElementById("restoreDiv")
hideBtn.addEventListener("click", function () {
  annuncio.classList.remove("d-md-flex")
  restoreDiv.classList.add("d-md-block")
})
const restoreBtn = document.getElementById("restoreBtn")
restoreBtn.addEventListener("click", function () {
  annuncio.classList.add("d-md-flex")
  restoreDiv.classList.remove("d-md-block")
})
