const searchForm = document.getElementById("search-form")
const mainContent = document.getElementById("main-content")
const searchList = document.getElementById("search-list")
const result = document.getElementById("result")

const audio = document.getElementById("audio-player")

// const pauseBt = document.getElementById("pause-btn")
// const playBtn = document.getElementById("play")
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
playBtn.style.cursor = "pointer"
pauseBtn.style.cursor = "pointer"

searchForm.addEventListener("submit", function (e) {
  e.preventDefault()
  mainContent.classList.add("d-none")
  search()
})
const search = function () {
  const searchInput = document.getElementById("search-input").value
  console.log(searchInput)
  const API = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchInput}`
  fetch(API)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      console.log(data.data)
      result.innerHTML = ""
      data.data.slice(0, 10).forEach((track) => {
        result.innerHTML += `<div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-4">
          <img src="${track.album.cover}" class="img-fluid rounded-start h-100" alt="${track.title}">
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 style="cursor:pointer;" class="play-track card-title" 
                    data-preview="${track.preview}"
                    data-title="${track.title}"
                    data-artist="${track.artist.name}"
                    data-cover="${track.album.cover}"
                    data-duration="${track.duration}">
                    ${track.title}
                  </h5>
                  <p class="card-text">
                  <a href="artist.html?id=${track.artist.id}"class="text-decoration-none text-dark fw-semibold">
                  ${track.artist.name}
                  </a>
                  </p>
                  <p class="card-text">
                  <small class="text-body-secondary">
                  <a href="album.html?id=${track.album.id}" class="text-decoration-none text-secondary">
                  ${track.album.title}
                  </a>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>`
      })
      const playTrack = document.querySelectorAll(".play-track")
      console.log(playTrack)
      playTrack.forEach((tr) => {
        tr.addEventListener("click", function (e) {
          e.preventDefault()
          const trackUrl = e.currentTarget.dataset.preview
          const trackTitle = e.currentTarget.dataset.title
          const trackArtist = e.currentTarget.dataset.artist
          const trackCover = e.currentTarget.dataset.cover
          const trackDur = e.currentTarget.dataset.duration
          console.log(trackUrl, trackTitle, trackCover, trackArtist, trackDur)
          audio.src = trackUrl

          const footerImg = document.getElementById("footer-img")
          const footerTitle = document.getElementById("footer-track-title")
          const footerArtist = document.getElementById("footer-track-artist")
          const trackDuration = document.getElementById("track-duration")
          footerImg.src = trackCover
          footerTitle.textContent = trackTitle
          footerArtist.textContent = trackArtist
          const minutes = Math.floor(trackDur / 60)
          const seconds = (trackDur % 60).toString().padStart(2, "0")
          trackDuration.textContent = `${minutes}:${seconds}`
          playPause()
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
