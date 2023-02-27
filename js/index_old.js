//ELEMENTOS CREADOS DESDE JS
const div = document.createElement("div")
div.textContent = "Ejercicio 01 - HTML, CSS, JS"
const test = document.getElementById("test")
test.appendChild(div)

//FUNCION PARA CREAR TARJETAS POKEMON
function obtenerDatos() {
    //llamamos al json y almacenamos su respuesta para trabajarla
    fetch('https://pokeapi.co/api/v2/pokemon').then(
        res => res.json()).then(data => {
            //console.log(data);
            //console.log(data.results);
            data.results.forEach(pokemon => {
                var pokename = pokemon.name;//almacenamos nombre
                var pokeurl = pokemon.url; //almacenamos url
                console.log(pokemon.url);

                //OBTENEMOS ID de cada url pokemon
                var actual = pokemon.url;
                var split = actual.split("/");//dividimos y convertimos en array
                var id = split[split.length - 2];//el último dato está vacío "/", cogemos -2
                //console.log(id);

                //ACCEDEMOS A LA INFORMACIÓN DE CADA POKEMON
                fetch('https://pokeapi.co/api/v2/pokemon/'+id+'/').then(res =>
                    res.json().then(pokedex => {
                        var imagen = pokedex.sprites.front_default;
                        
                        //creamos las cartas con estilos bootstrap
                        const cardAll = `
                        <div id="tarjeta${pokename}"class="card mx-5 my-5" style="width: 18rem;">
                        <img src="${imagen}" class="card-img-top" alt="imagen_pokemon">
                        <div class="card-body">
                            <h5 class="card-title">Nombre: ${pokename}</h5>
                            <p class="card-text"></p>
                            <a href="${pokeurl}" class="btn btn-info">JSON</a>
                            <a href="card.html?pokemon=${id}" class="btn btn-primary" id="navegar">INFORMACIÓN</a>
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

function obtenerURL(){
    //OBTENEMOS LA URL ACTUAL AL ACCEDER DESDE UN POKEMON
    var URLactual = window.location.search;
    var split2 = URLactual.split("=");
    var idURL = split2[split2.length -1];
    console.log(split2);
    console.log(idURL);
}
obtenerURL();

function navegacion() {
    //llamamos al json y almacenamos su respuesta para trabajarla
    fetch('https://pokeapi.co/api/v2/pokemon').then(
        res => res.json()).then(data => {
            //console.log(data);
            //console.log(data.results);
            data.results.forEach(pokemon => {
                var pokename = pokemon.name;//almacenamos nombre
                var pokeurl = pokemon.url; //almacenamos url
                console.log(pokemon.url);

                //OBTENEMOS ID de cada url pokemon
                var actual = pokemon.url;
                var split = actual.split("/");//dividimos y convertimos en array
                var id = split[split.length - 2];//el último dato está vacío "/", cogemos -2
                //console.log(id);

                //ACCEDEMOS A LA INFORMACIÓN DE CADA POKEMON
                fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/').then(res =>
                    res.json().then(pokedex => {

                        var imagen = pokedex.sprites.front_default;
                        var nametype = '';
                        var pokeStats = '';
                        var pokeStat = '';

                        var muestraInfo = '';

                        //var prueba = pokedex.types[0].type.name;
                        //var prueba2 = pokedex.types[1].type.name;
                        
                        //OBTENER EL TIPO DE POKEMON
                        pokedex.types.forEach(type =>{
                            nametype = nametype + '<hr>' + type.type.name;
                            //console.log(nametype);
                            //console.log(type.type.name);
                        })

                        pokedex.stats.forEach(stat =>{
                            pokeStats = stat.stat.name;
                            pokeStat = stat.base_stat;

                            muestraInfo = muestraInfo + `<li class="list-group-item" id="state">${pokeStats} / ${pokeStat}</li>`;
                        })

                        //creamos las cartas con estilos bootstrap

                        //OBTENEMOS LA URL ACTUAL AL ACCEDER DESDE UN POKEMON
                        var URLactual = window.location.search;
                        var split2 = URLactual.split("=");
                        var idURL = split2[split2.length -1];
                        //console.log(split2);
                        //console.log(idURL);
                        //console.log(id);

                        if (idURL == id){
                            //return console.log('coincide');
                            const pokecard = `
                            <div class="col-4">
                            <div class="card">
                            <h5 class="card-title text-center">Nº ${id} / 20</h5>
                                <img src="${imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title text-center">${pokename}</h5>
                                <p class="card-text text-center">${nametype}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                ${muestraInfo}
                                </ul>
                            </div>
                            </div>
                            `
    
                            const cardInfo = document.getElementById("card-pokemon")
                            cardInfo.innerHTML += pokecard
                        }else{
                            return //console.log('no coincide');
                        }
                        //console.log(pokedex);
                        //console.log(imagen);
                    
                    }));
                    
            })
        });

}
navegacion();