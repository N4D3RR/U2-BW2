const URL = `https://striveschool-api.herokuapp.com/api/deezer/artist/412`

const artistName = document.getElementById("artist-name")
const fans = document.getElementById("monthly-viewers")
const songs = document.getElementById("songs")
const albums = document.getElementById("other-album")
const artistHeader = document.getElementById("artist-header")

fetch(URL)
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
