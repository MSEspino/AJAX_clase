const main = () =>
{
    const idPeli = sessionStorage.getItem("pelicula_id")
    console.log(`ID de la pelicula: ${idPeli}`)
}
window.addEventListener("load", main)