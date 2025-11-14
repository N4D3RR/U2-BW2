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

const footerNavbar = document.getElementById("bottom-navbar")

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

const cerca = document.getElementById("cerca")
cerca.addEventListener("click", () => {
  cerca.classList.toggle("text-secondary")
  cerca.classList.toggle("text-white")
})
