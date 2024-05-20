// http://www.omdbapi.com/?apikey=304612db&

function movieInfo() {
    const id = localStorage.getItem("imdbID")
}

// console.log(movieInfo())

const id = localStorage.getItem("imdbID")

async function movieDetails() {
    const movieDets = await fetch(`https://www.omdbapi.com/?apikey=304612db&i=${localStorage.getItem("imdbID")}`)
    let data = await movieDets.json()
    if (!Array.isArray(data)) {
        data = [data]
    }

    const movieDetailsEl = document.querySelector(' .movie__info')
    if (!movieDetailsEl) {
        console.error("Not found")
    }
    movieDetailsEl.innerHTML = data.map((movie) => movieDetailsHTML(movie)).join("")
    console.log(data)
}

movieDetails()

function movieDetailsHTML(movie) {
    return `<div class="movie__img--wrapper">
                <h1 class="movie__page--title" >${movie.Title}</h1>
                <img class="movie__page--img" src="${movie.Poster}" alt="">
            </div>
            <div class="movie__info--wrapper">
                <h2 style="font-weight: 800">About the Movie:</h2>
                <h3><span class="red">Released: <span>${movie.Released}</span></span></h3>
                <h3><span class="red">Actors: <span>${movie.Actors}</span></span></h3>
                <h3><span class="red">Genre: <span>${movie.Genre}</span></span></h3>
                <h3><span class="red">Director: <span>${movie.Director}</span></span></h3>
                <h3><span class="red">Writer: <span>${movie.Writer}</span></span></h3>
                <h3><span class="red">Language: <span>${movie.Language}</span></span></h3>
                <h3><span class="red">Plot: <span>${movie.Plot}</span></span></h3>
            </div>`
}