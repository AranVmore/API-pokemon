//ELEMENTOS CREADOS DESDE JS EN HTML
const div = document.createElement("div")
div.textContent = "Ejercicio 01 - HTML, CSS, JS"
const test = document.getElementById("test")
test.appendChild(div)

//FUNCION PARA CREAR TARJETAS POKEMON
function obtenerDatos() {
    //llamamos al json y almacenamos los datos de interés
    fetch('https://pokeapi.co/api/v2/pokemon').then(
        res => res.json()).then(data => {
            //console.log(data);
            // recorremos results para mostrar sus datos
            data.results.forEach(pokemon => {
                var pokename = pokemon.name;//almacenamos nombre
                var pokeurl = pokemon.url; //almacenamos url

                //OBTENEMOS ID de cada url pokemon
                var actual = pokemon.url;
                var split = actual.split("/");//dividimos y convertimos en array
                var id = split[split.length - 2];//el último dato está vacío "/", cogemos -2
                //console.log(id);

                //ACCEDEMOS A LA INFORMACIÓN DE CADA POKEMON
                fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/').then(res =>
                    res.json().then(pokedex => {
                        var imagen = pokedex.sprites.front_default;
                        
                        //creamos la carta que se repetirá con estilos bootstrap
                        const cardAll = `
                        <div id="tarjeta${pokename}"class="card mx-5 my-5" style="width: 18rem;">
                        <img src="${imagen}" class="card-img-top" alt="imagen_pokemon">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${pokename}</h5>
                            <p class="card-text"></p>
                            <div class="text-center">
                            <a href="${pokeurl}" class="btn btn-info" >JSON</a>
                            <a href="card.html?pokemon=${id}" class="btn btn-primary">INFORMACIÓN</a>
                            </div>
                        </div>
                        </div>
                        `
                        const cardContainer = document.getElementById("card-container")
                        cardContainer.innerHTML += cardAll
                    }));

            })
        });
}
obtenerDatos();


