let movies;

window.addEventListener('DOMContentLoaded', getJSON);

function getJSON() {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then((response) => response.json())
        .then((result) => {
            movies = result; // 🤑🥵💀
        })
        .catch((error) => {
            console.error('Error en la solicitud:', error);
        });
}

// Obtener referencia al campo de búsqueda por su ID (Derechos reservados Subgrupo 1)
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => {
    // Obtener el valor del campo de búsqueda y limpiar espacios en blanco
    let valueSearch = inputBuscar.value.trim().toLowerCase();

    if (valueSearch.length !== 0) {
        // Inicializar un array para almacenar las películas coincidentes
        let searchResults = [];

        // Iterar sobre todas las películas y encontrar las coincidencias
        movies.forEach((movie) => {
            const { title, genres, tagline, overview } = movie;
            // Convertir genres a cadena antes de usar toLowerCase
            const genresString = genres.toString();
            if (
                title.toLowerCase().includes(valueSearch) ||
                genresString.toLowerCase().includes(valueSearch) ||
                tagline.toLowerCase().includes(valueSearch) ||
                overview.toLowerCase().includes(valueSearch)
            ) {
                searchResults.push(movie);
            }
        });
        showFilteredMovies(searchResults);
    }
});




// Función para mostrar las películas filtradas en tu interfaz
function showFilteredMovies(filteredMovies) {
    // Obtén una referencia al elemento UL donde deseas mostrar los resultados
    const lista = document.getElementById("lista");

    // Limpia cualquier contenido anterior en la lista
    lista.innerHTML = '';

    if (filteredMovies.length === 0) {
        // Si no se encontraron películas, muestra un mensaje en la lista
        const mensajeNoEncontrado = document.createElement("li");
        mensajeNoEncontrado.textContent = 'No se encontraron películas.';
        lista.appendChild(mensajeNoEncontrado);
    } else {
        // Recorre las películas filtradas y agrega cada una como un elemento de la lista
        filteredMovies.forEach((movie) => {
            const score = movie.vote_average /2 ;
            contenido = `
                <li class="list-group container" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                <h2>${movie.title}</h2>
                <p>${movie.tagline}</p>
                ${stars(score)}

                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body">
                    ${movie.overview}
                    <ul>
                        <li></li>
                    </ul>
                  </div>
                </div>
                </li>
            `
            lista.innerHTML += contenido
        });
    }
}

function stars(score) {
    const totalStars = 5; // Número total de estrellas
    const starIcon = '⭐';
    const emptyStarIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="20" height="19" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
    </svg>`; // Icono para estrella vacía

    // Calcula el número de estrellas coloreadas y vacías
    const coloredStars = Math.min(score, totalStars);
    const emptyStars = totalStars - coloredStars;

    // Crea la cadena de estrellas coloreadas
    const coloredStarsString = starIcon.repeat(coloredStars);

    // Crea la cadena de estrellas vacías
    const emptyStarsString = emptyStarIcon.repeat(emptyStars);

    // Une las estrellas coloreadas y vacías en una sola cadena
    const starsString = coloredStarsString + emptyStarsString;

    return starsString;
}

