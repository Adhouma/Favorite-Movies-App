const addMovieButton = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const backddrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = addMovieModal.querySelector(".btn--success");
const userInputs = addMovieModal.querySelectorAll("input");
const entrytextSection = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];

const showBackdrop = () => {
  backddrop.classList.add("visible");
};

const hideBackdrop = () => {
  backddrop.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  showBackdrop();
};

const closeAddMovieModal = () => {
  addMovieModal.classList.remove("visible");
  hideBackdrop();
};

const closeDeleteMovieModal = () => {
  deleteMovieModal.classList.remove("visible");
  hideBackdrop();
};

const backddropClickHandler = () => {
  closeAddMovieModal();
  closeDeleteMovieModal();
  clearUserInputs();
};

const confirmAddMovie = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  closeAddMovieModal();
  clearUserInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const cancelAddMovie = () => {
  closeAddMovieModal();
  clearUserInputs();
};

const clearUserInputs = () => {
  for (let userInput of userInputs) {
    userInput.value = "";
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entrytextSection.style.display = "block";
  } else {
    entrytextSection.style.display = "none";
  }
};

const renderNewMovieElement = (id, title, image, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>`;
  movieList.appendChild(newMovieElement);
  newMovieElement.addEventListener("click", confirmDeleteMovie.bind(null, id));
};

const deleteMovie = (movieId) => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === movieId) {
      movies.splice(i, 1);
      movieList.children[i].remove();
    }
  }
  closeDeleteMovieModal();
  updateUI();
};

const confirmDeleteMovie = (movieId) => {
  deleteMovieModal.classList.add("visible");
  showBackdrop();
  let confirmDeleteMovieButton = deleteMovieModal.querySelector(".btn--danger");
  const cancelDeleteMovieButton = deleteMovieModal.querySelector(".btn--passive");

  confirmDeleteMovieButton.replaceWith(confirmDeleteMovieButton.cloneNode(true));
  confirmDeleteMovieButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeleteMovieButton.removeEventListener("click", closeDeleteMovieModal);
  cancelDeleteMovieButton.addEventListener("click", closeDeleteMovieModal);

  confirmDeleteMovieButton.addEventListener("click", deleteMovie.bind(null, movieId));
};

addMovieButton.addEventListener("click", showMovieModal);
backddrop.addEventListener("click", backddropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", confirmAddMovie);
