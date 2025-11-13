const searchForm = document.getElementById("search-form")
const mainContent = document.getElementById("main-content")
const searchList = document.getElementById("search-list")
const result = document.getElementById("result")

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
          <h5 class="card-title">${track.title}</h5>
          <p class="card-text">
            <a href="artist.html?id=${track.artist.id}" class="text-decoration-none text-dark fw-semibold">
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
    })
    .catch((err) => {
      console.log(err)
    })
}
