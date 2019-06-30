import {
  renderCharactersContainers,
  getById,
  getCharacter,
  renderPageWhendataAvailable,
  setActiveLink,
  getStorageItems,
  initStorage,
  removeAllCharacters
} from "./mixins.js";
import { redirectToCharacters } from "./characters.js";
import { redirectToDetail } from "./detail.js";

const redirectToHome = () => {
  location.hash = "/home";
};

async function renderHome() {
  const DEFAULT_QTY = 50;
  renderCharactersContainers(3, "home-page");
  let a = await initStorage();
  let qtyOfCharacters = getStorageItems("apiConf").QTY_HOME_CHARACTERS;
  if (DEFAULT_QTY != qtyOfCharacters) {
    removeAllCharacters("home-page");
    renderCharactersContainers(qtyOfCharacters, "home-page");
  }
  getHomeCharacters();
  setActiveLink("home-link");
  addEventListenersHome();
}

const randomNumber = maxLimit => {
  return Math.floor(Math.random() * maxLimit) + 1;
};

const addEventListenersHome = () => {
  let imgContainer = getById("home-page");
  const showAllButton = getById("button-showAll");
  imgContainer.addEventListener("click", redirectToDetail);
  showAllButton.addEventListener("click", redirectToCharacters);
};

const getHomeCharacters = () => {
  const qtyOfCharacters = getStorageItems("apiConf").QTY_HOME_CHARACTERS;
  const homeCharacters = getRandomCharacters(qtyOfCharacters);
  Promise.all(homeCharacters).then(receivedData => {
    const formatedDataForRender = { results: receivedData };
    let promise = Promise.resolve(formatedDataForRender);
    renderPageWhendataAvailable(promise, "home-page");
  });
};

const getRandomCharacters = qtyOfCharacter => {
  let promises = [];
  let url = getStorageItems("apiConf").charactersUrl;
  for (let i = 0; i < qtyOfCharacter; i++) {
    promises.push(getCharacter(url, randomNumber(493)));
  }
  return promises;
};

export { redirectToHome, renderHome };
