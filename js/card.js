//ELEMENTOS CREADOS DESDE JS
const div = document.createElement("div")
div.textContent = "Ejercicio 01 - HTML, CSS, JS"
const test = document.getElementById("test")
test.appendChild(div)

//TABLA DE COLORES PARA EL TIPO DE POKEMON
var typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: 'white',
};

//FUNCION PARA CREAR LA TARJETA INDIVIDUAL DEL POKEMON
function navegacion() {
    var URLactual = window.location.search; //url buscador
    var split2 = URLactual.split("="); //separamos
    var idURL = split2[split2.length - 1]; //cogemos final

    //ACCEDEMOS A LA INFORMACIÓN DE CADA POKEMON POR ID
    fetch('https://pokeapi.co/api/v2/pokemon/' + idURL + '/').then(res =>
        res.json().then(pokedex => {

            //DEL FICHERO JSON OBTENEMOS LA SIGUIENTE INFORMACIÓN
            var pokemonname = pokedex.name; //obtenemos nombre
            var imagen = pokedex.sprites.front_default; //obtenemos la imagen
            var tipo1 = pokedex.types[0].type.name; //obtenemos primer tipo del pokemon
            var tipo2 = pokedex.types[1] ? pokedex.types[1].type.name : ''; //obtenemos el segundo si tiene, si no, lo mostramos vacío
            var colorOne = typeColors[pokedex.types[0].type.name]; //le asignamos el color segun el tipo que coincide con la paleta
            var colorTwo = pokedex.types[1] ? typeColors[pokedex.types[1].type.name] : typeColors.default; //igual para el segundo
            var nametype = '';
            var pokeStats = '';
            var pokeStat = '';
            var muestraInfo = '';
            var muestaTipo = '';
            //console.log(colorOne);

            //OBTENER EL TIPO/S DEL POKEMON
            pokedex.types.forEach(type => {
                nametype = nametype + ' ' + type.type.name;
                //muestaTipo = `<p style="color:${colorOne}" class="card-text text-center text-uppercase">${tipo1}</p>
                //                <p style="color:${colorTwo}" class="card-text text-center text-uppercase">${tipo2}</p>`;

                muestaTipo = `<p class="card-text text-center text-uppercase"><span style="background-color:${colorOne}" class="badge  rounded-pill"> ${tipo1} 
                            </span><span style="background-color:${colorTwo}" class="badge  rounded-pill"> ${tipo2} </span></p>`;
            })
            //OBTENEMOS LAS ESTADISTICAS DEL POKEMON
            pokedex.stats.forEach(stat => {
                pokeStats = stat.stat.name; //nombre del dato
                pokeStat = stat.base_stat; //valor del dato

                muestraInfo = muestraInfo + `<li class="list-group-item d-flex justify-content-between align-items-center">${pokeStats} 
                                            <span class="badge bg-primary rounded-pill">${pokeStat}</span></li>`;
            })

            //RELLENAMOS DE FORMA DINAMICA Y PINTAMOS LA TARJETA
            const pokecard = `
                        <div class="col-lg-3 col-6">
                        <div class="card">
                        <h5 class="card-title text-center bg-light">Nº ${idURL} / 20</h5>
                            <img src="${imagen}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title text-center bg-light text-uppercase">${pokemonname}</h5>
                            ${muestaTipo}
                            </div>
                            <ul class="list-group list-group-flush">
                            ${muestraInfo}
                            </ul>
                        </div>
                        </div>
                        `

            const cardInfo = document.getElementById("card-pokemon")
            cardInfo.innerHTML += pokecard
        }))
}
navegacion();