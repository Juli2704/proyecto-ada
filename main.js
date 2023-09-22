const apiResponse = "https://rickandmortyapi.com/api";
const container = document.getElementById("container");
let parFiltro = ""
let valorFiltro = ""
const femeninoBtn= document.getElementById("femenino")
const masculinoBtn= document.getElementById("masculino")
const genderlessBtn = document.getElementById("genderless")
const indeterminadoBtn= document.getElementById("indeterminado")
const vivoBtn= document.getElementById("vivo")
const muertoBtn= document.getElementById("muerto")
const desconocidoBtn= document.getElementById("desconocido")
const humanoBtn= document.getElementById("humano")
const alienBtn= document.getElementById("alien")
let pagSig = 1;
let totalPag = 0;
const btnSig= document.getElementById("siguiente");
const btnAnt= document.getElementById("anterior");
   
           

const totalPersonajes = () =>{
    fetch(`${apiResponse}/character`) 
    .then (res => res.json())
    .then ((character) => listaPersonajes (character))
   
}
totalPersonajes()

const listaPersonajes = (character) => {
    container.innerHTML = ""
     character.results.forEach(character => {
     container.innerHTML +=  
     `<div class="card">
         <h3>${character.name}</h3>
         <img src="${character.image}" alt="">
         <button class="button" onclick=verDescripcion("${character.url}")>Ver más</button>
     </div>`
     
})
}
const verDescripcion = (characterUrl) => {
    fetch (characterUrl)
    .then (res => res.json())
    .then ((character) => {
    container.innerHTML =
    `<div class="card">
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="">
        <p>Estado: ${character.status}</p>
        <p>Especie: ${character.species}</p>
        <p>Genero: ${character.gender}</p>
        <button onclick=totalPersonajes()>Volver</button>      
        
    </div>`
    
})
}

  
// Filtros//



const filtrosPersonajes = (parFiltro,valorFiltro) => {
    fetch (`https:rickandmortyapi.com/api/character/?${parFiltro}=${valorFiltro}`)
    .then (res => res.json())
    .then ((character) => listaPersonajes (character))
}


femeninoBtn.addEventListener("click",() =>{
    filtrosPersonajes("gender","female")
})

masculinoBtn.addEventListener("click",() =>{
    filtrosPersonajes("gender","male")
})
genderlessBtn.addEventListener("click",() =>{
    filtrosPersonajes("gender","genderless")
})
indeterminadoBtn.addEventListener("click",() =>{
    filtrosPersonajes("gender","unknow")
})
vivoBtn.addEventListener("click",() =>{
    filtrosPersonajes("status","alive")
})
muertoBtn.addEventListener("click",() =>{
    filtrosPersonajes("status","dead")
})
desconocidoBtn.addEventListener("click",() =>{
    filtrosPersonajes("status","unknow")
})
humanoBtn.addEventListener("click",() =>{
    filtrosPersonajes("species","Human")
})
alienBtn.addEventListener("click",() =>{
    filtrosPersonajes("species","Alien")
})


//paginación//



const pagSiguiente = (numPag) => {
container.innerHTML=""
fetch(`https://rickandmortyapi.com/api/character/?page=${numPag}`)

 .then (res => res.json())
 .then ((character) => {
    listaPersonajes (character)
    totalPag = character.info.pages
    })

}
pagSiguiente(pagSig)


btnSig.addEventListener("click", () =>{
  
   
    if(pagSig<=1){
            pagSig++;
    } 
    else if (pagSig>1 && pagSig<totalPag){
            btnAnt.removeAttribute("disabled", true)
            pagSig++;
    }
    else{
        btnSig.setAttribute("disabled", true)
    }  
        
    pagSiguiente(pagSig);
    })

btnAnt.addEventListener("click", () =>{
    
    if(pagSig<=1){
             btnAnt.setAttribute("disabled", true)
              
        } 
    else if (pagSig>1 && pagSig<totalPag){
            pagSig--;
            btnSig.removeAttribute("disabled", true)
        }
    else{
            btnSig.setAttribute("disabled", true)
            pagSig--;
        }  
            
        pagSiguiente(pagSig);
        })






