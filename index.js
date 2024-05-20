// http://www.omdbapi.com/?apikey=304612db&

const movieEl = document.querySelector('.movie__wrapper')
const searchInput = document.getElementById('storedName');


async function onSearchChange(event) {
    const searchItem = event.target.value
    const moviesRes = await fetch(`http://www.omdbapi.com/?apikey=304612db&s=${searchItem}`)
    const data = await moviesRes.json()
    setTimeout(() => {
        if (data.Search) {
            movieEl.innerHTML = data.Search.map((movie) => movieHTML(movie)).slice(0, 8).join('')
        } else {
            console.error('No Movies Found')
            movieEl.innerHTML = '<p>No Movies Found</p>';
        }
    }, 2000)
    loadingSpinner()
    
}

function movieHTML(movie) {
    return `<div class="movie">
                <div class="movie__background">
                    <img src="${movie.Poster}" alt="" class="movie__img">
                    <div class="movie__details">
                        <h1>${movie.Title}</h1>
                        <h1>${movie.Year}</h1>
                        <p class="movie__details--para"><a onclick="movieInfo('${movie.imdbID}')">More Info</a></p>
                    </div>
                </div>
            </div>`
}

function movieInfo(imdbID) {
    localStorage.setItem("imdbID", imdbID)
    window.location.href = 'movie.html'
}

// Load Spinner
function loadingSpinner(load) {
    const loadingEl = document.querySelector(".loading__spinner")

    loadingEl.classList += " loading__active"
    setTimeout(() => {
        loadingEl.classList.remove("loading__active");
    }, 2000)
}

function getInput() {
    var storedName = document.getElementById('storedName').value;
    var storedResult = document.getElementById('storedResult');
    storedResult.textContent = storedName;

    onSearchChange({ target: { value: storedName} })
    const event = new Event('change');
    searchInput.dispatchEvent(event);
}    

// Add event listener for 'Enter' keypress
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getInput();
    }
});

// Add event listener for 'change' event
searchInput.addEventListener('change', onSearchChange);