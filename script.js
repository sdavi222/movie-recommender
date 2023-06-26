var selectedGenre = null;

function setGenre(genreId) {
  selectedGenre = genreId;
  updateGenreDropdownText();
}

function updateGenreDropdownText() {
  var genreDropdownToggle = document.getElementById('genreDropdownToggle');
  var genreName = getGenreName(selectedGenre);
  genreDropdownToggle.textContent = genreName;
}

function getGenreName(genreId) {
  switch (genreId) {
    case '28':
      return 'Action';
    case '18':
      return 'Drama';
    case '35':
      return 'Comedy';
    case '53':
      return 'Thriller';
    case '10749':
      return 'Romance';
    case '27':
      return 'Horror';
    default:
      return '';
  }
}

function generateRandomMovie() {
  if (!selectedGenre) {
    alert("Please select a genre.");
    return;
  }

  var apiKey = "1a1847a2de9bb743bda368ba12986922";
  var url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var movies = data.results;
      var randomIndex = Math.floor(Math.random() * movies.length);
      var randomMovie = movies[randomIndex];

      var imageUrl = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;

      var movieInfo = document.getElementById("movieInfo");
      movieInfo.innerHTML = `
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imageUrl}" alt="${randomMovie.title}" class="img-fluid">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${randomMovie.title}</h5>
                <p class="card-text">${randomMovie.overview}</p>
                <p class="card-text"><small class="text-muted">Release Date: ${randomMovie.release_date}</small></p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.log(error);
      alert("Failed to fetch movie data. Please try again.");
    });
}