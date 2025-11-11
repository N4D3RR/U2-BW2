const c1 = document.querySelectorAll(".album")

c1.forEach((card) => {
  card.style.cursor = "pointer"
  card.addEventListener("click", () => {
    const albumId = card.dataset.albumId //prendo l'id
    window.location.assign(`album.html?id=${albumId}`) //apro album.html con l'id dell'album
  })
})
const redirectToAlbumPage = (albumId) => {
  const url = `./album.html?id=${albumId}`
  location.assign(url, albumId)
}
