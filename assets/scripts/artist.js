const paramsString = window.location.search
const params = new URLSearchParams(paramsString)
const artistId = params.get("id") || 412

const artistName = document.getElementById("artist-name")
const fans = document.getElementById("monthly-viewers")
const songs = document.getElementById("songs")
const albums = document.getElementById("other-album")
const artistHeader = document.getElementById("artist-header")

const playPauseBtn = document.getElementById("play-btn")
const pauseBtn = document.querySelector(".bi-pause-circle-fill")
const playBtn = document.getElementById("play")
const footerImg = document.getElementById("footer-img")
const footer = document.getElementById("player")
playPause = () => {
  if (audio.paused) {
    audio.play()
    playBtn.classList.add("d-none")
    pauseBtn.classList.remove("d-none")
    footer.classList.remove("d-none")
  } else {
    audio.pause()
    playBtn.classList.remove("d-none")
    pauseBtn.classList.add("d-none")
  }
}

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
          <span class="col col-7 ms-2 "> ${track.title}</span><span class="col col-3"> ${track.rank} ascolti</span>
<span class="col col-2"> ${minutes}:${seconds} </span>`
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
