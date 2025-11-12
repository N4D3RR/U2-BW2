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

// playPauseBtn.addEventListener("click", () => {
//   playBtn.classList.toggle("d-none")

//   pauseBtn.classList.toggle("d-none")

//   console.log(pauseBtn)
// })

playPause = () => {
  playBtn.classList.toggle("d-none")

  pauseBtn.classList.toggle("d-none")
}
