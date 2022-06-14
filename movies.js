const crearFilaPelis = function(pelicula)
{
    //Crear tr (y tds hijos) con data de pelicula
    const tr = document.createElement("tr")

    const tdId = document.createElement("td")
    const tdTitulo = document.createElement("td")
    const tdLanzamiento = document.createElement("td")
    const tdRecaudacion = document.createElement("td")
    const tdFase = document.createElement("td")
    const tdPostCreditos = document.createElement("td")
    const tdAcciones = document.createElement("td")

    tdId.innerText = pelicula.id
    tdTitulo.innerText = pelicula.title
    tdLanzamiento.innerText = pelicula.release_date

    const recaudacionFormat = parseInt(pelicula.box_office).toLocaleString()
    tdRecaudacion.innerText = recaudacionFormat

    tdFase.innerText = pelicula.phase
    tdPostCreditos.innerText = pelicula.post_credit_scenes
    
    const a = document.createElement("a")
    a.setAttribute("href", "#")
    a.innerText = "Seleccionar"
    tdAcciones.appendChild(a)

    tr.appendChild(tdId)
    tr.appendChild(tdTitulo)
    tr.appendChild(tdLanzamiento)
    tr.appendChild(tdRecaudacion)
    tr.appendChild(tdFase)
    tr.appendChild(tdPostCreditos)
    tr.appendChild(tdAcciones)

    return tr
}

//Arrow functions
const crearTablaPelis =  (listaPelis) =>
{
    const tbody = document.getElementById("dataPelis")
    //iteracion por cada uno de sus elementos
    for(let pelicula of listaPelis)
    {
        const tr = crearFilaPelis(pelicula)
        tbody.appendChild(tr)
    }
}

const crearCard = (pelicula) =>
{
    const divCard = document.createElement("div")
    divCard.setAttribute("class","card")

    //Creamos imagen
    if(pelicula.cover_url !=null){
        const img = document.createElement("img")
        img.setAttribute("src", pelicula.cover_url)
        img.setAttribute("class","card-img-top")
        divCard.appendChild(img)
    }

    //Crear card-body
    const divCardBody = document.createElement("div")
    divCardBody.setAttribute("class","card-body")

    const h3= document.createElement("h3")
    h3.setAttribute("class","card-title")
    h3.innerText = pelicula.title
    divCardBody.appendChild(h3)
    
    const p = document.createElement("p")
    p.setAttribute("class","card-text")
    p.innerText = pelicula.overview
    divCardBody.appendChild(p)

    const divRow1=document.createElement("div")
    divRow1.setAttribute("class","row")
    const divDirector = document.createElement("div")
    divDirector.setAttribute("class","col-4")
    divDirector.innerText="Director:"
    divRow1.appendChild(divDirector)

    const divDirectorValor = document.createElement("div")
    divDirectorValor.setAttribute("class","col-4")
    divDirectorValor.innerText=pelicula.directed_by
    divRow1.appendChild(divDirectorValor)

    divCardBody.appendChild(divRow1)

    const divRow2=document.createElement("div")
    divRow2.setAttribute("class","row")
    const divSaga = document.createElement("div")
    divSaga.setAttribute("class","col-4")
    divSaga.innerText="Saga:"
    divRow2.appendChild(divSaga)

    const divSagaValor = document.createElement("div")
    divSagaValor.setAttribute("class","col-4")
    divSagaValor.innerText=pelicula.saga
    divRow2.appendChild(divSagaValor)

    divCardBody.appendChild(divRow2)

    const boton = document.createElement("button")
    boton.setAttribute("class","btn btn-primary mt-3")
    boton.innerText="Seleccionar"
    boton.addEventListener("click", () => {
        console.log(`ID: ${pelicula.id}`)
        sessionStorage.setItem("pelicula_id", pelicula.id)
        location.href = "/movie_detail.html"
    })
    divCardBody.appendChild(boton)


    
    divCard.appendChild(divCardBody)

    return divCard

}

const crearSetCardsPelis = (listaPelis) =>
{
    const divCardsContainer = document.getElementById("v-pills-card")
    let divCardDeck;
    for(let i in listaPelis) 
    {
        const pelicula = listaPelis[i]
        if(i%2==0)
        {
            //1. Crear un card deck
            divCardDeck = document.createElement("div")
            divCardDeck.setAttribute("class","card-deck")
            divCardsContainer.appendChild(divCardDeck)
            
        }
        
        //Agregar card

        const divCard = crearCard(pelicula)
        divCardDeck.appendChild(divCard)
        
    }
}

const obtenerDataPelis = async function()
{
    //Promises
    /*fetch("https://mcuapi.herokuapp.com/api/v1/movies").then(function(response){
        return response.json()
    }).then(function(datos){
        const listaPelis = datos.data
        crearTablaPelis(listaPelis)
        crearSetCardsPelis(listaPelis)
        
    }) */
    
    //asyn await: El await se pone donde haya una funcion asincrona
    
    const response = await fetch("https://mcuapi.herokuapp.com/api/v1/movies")
    //convertir json a js
    const datos = await response.json()
    const listaPelis = datos.data
    crearTablaPelis(listaPelis)
    crearSetCardsPelis(listaPelis)


    /*const req = new XMLHttpRequest();
    req.addEventListener("load", function(event)
    {
        document.write(event.target.responseText)
    })
    req.open("GET", "https://mcuapi.herokuapp.com/api/v1/movies")
    req.send() */
}

const main = function()
{
    obtenerDataPelis()
}

window.addEventListener("load", main)