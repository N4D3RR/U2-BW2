const paramsString = window.location.search
const params = new URLSearchParams(paramsString)
const albumId = params.get("id")
console.log(params)

const col = document.getElementById("cards-cols")

const createCard = function (track) {
  const card = `<div class="card">
  <img src="${track.album.cover}" class="card-img-top" alt="cover img">
  <div class="card-body">
    <p class="card-text">${track.title}</p>
  </div>
</div>`
  col.innerHTML += card
  console.log(card)
}

const fetchAlbumData = (id) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=bohemian`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore:", res.status)
      }
    })
    .then(() => {
      createCard()
    })
    .catch((err) => {})
}
fetchAlbumData()
