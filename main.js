const imagesUrl = 'https://image.tmdb.org/t/p/w500';
let url = 'https://api.themoviedb.org/3/discover/movie?api_key=95ce2187ac8aaaf922eb7c3ac0746379';


// const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=95ce2187ac8aaaf922eb7c3ac0746379&query='


const search = document.querySelector('.search');

const movieList = document.querySelector('.box');

const fragment = document.createDocumentFragment();

const loader = document.querySelector('.loader');

const loaderDiv = document.createElement('div');
loaderDiv.classList.add('loader-div')
loader.appendChild(loaderDiv)

async function fetchData () {

  if (!search.value) {
    url = 'https://api.themoviedb.org/3/discover/movie?api_key=95ce2187ac8aaaf922eb7c3ac0746379'
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=95ce2187ac8aaaf922eb7c3ac0746379&query=${search.value}`
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    movieList.innerHTML = '';

    data.results.map((movie) => {
      console.log(movie);


    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');

    const images = document.createElement('img');
    images.src = `${imagesUrl}${movie.backdrop_path}`;
    images.alt = movie.title;

    const lisBox = document.createElement('div');
    lisBox.classList.add('lisBox');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const rating = document.createElement('span');
    rating.textContent = movie.vote_average;


    movieBox.appendChild(images);
    movieBox.appendChild(title);
    movieBox.appendChild(rating);
    fragment.appendChild(movieBox);



    // movieBox.appendChild(images);
    // lisBox.appendChild(title);
    // lisBox.appendChild(rating);
    // movieBox.appendChild(lisBox)
    // fragment.appendChild(movieBox);


    movieList.appendChild(fragment);

    if (movie.vote_average < 5) {
      rating.style.color = 'yellow';
    }
    else if (movie.vote_average > 5 && movie.vote_average < 8) {
      rating.style.color = 'red';
      rating.style.textShadow = '0px 0px 5px red';
    }
    else  if (movie.vote_average > 8) {
      rating.style.color = 'green';
      rating.style.textShadow = '0px 0px 5px green';
    }

  })

  } catch (error) {
    console.log(error);
  }
}

// setTimeout(() => {
//   fetchData();
// }, 2000);

fetchData();

const searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', () => {
  fetchData();
})
