import config from "./config.js";
import mixins from "./mixins.js";
import { showModalDetail } from "./detail.js";
/* import mixins as _ from "./mixins.js"; */

const API_URL = config.API_URL;
const QTY_HOME = config.QTY_HOME;
let isLoadingMorePeople = false;
let previousLastId = 0;
let nextFigureId = 0;

const redirectToHome = () => {
  location.hash = "/home";
};

const reqDataServer = async (qtyCharacters = 1) => {
  let dataFromServer = await mixins.reqDataServer(
    API_URL,
    "?results=" + qtyCharacters
  );
  return dataFromServer;
};

const setNewFiguresInfo = async persons => {
  const [IMG, FLAG, NAME] = [0, 1, 2];
  for (let i = 0; i < persons.length; i++) {
    let personInfo = persons[i];
    let figure = mixins.getById(i + previousLastId).children;
    let country = personInfo.nat;
    figure[IMG].src = personInfo.picture.large;
    figure[NAME].innerHTML = personInfo.name.first + " " + personInfo.name.last;
    figure[FLAG].src = `https://www.countryflags.io/${country}/shiny/64.png`;
  }
  previousLastId = nextFigureId;
};

const addHomeListeners = () => {
  const gridContainer = mixins.getById("grid-container");
  gridContainer.addEventListener("click", showModalDetail);
  window.addEventListener("scroll", loadMorePersons);
};

const loadMorePersons = async () => {
  if (isReachingEnd() && !isLoadingMorePeople) {
    isLoadingMorePeople = true;
    nextFigureId = mixins.renderPeoleFigures(
      QTY_HOME,
      "grid-container",
      previousLastId
    );
    const dataFromServer = await reqDataServer(QTY_HOME);
    let charactersObject = await mixins.getStorageItems("charactersObject");
    charactersObject = charactersObject.concat(dataFromServer.results);
    mixins.saveCharacters(charactersObject);
    setNewFiguresInfo(dataFromServer.results);
    isLoadingMorePeople = false;
  }
};

const isReachingEnd = () => {
  let wrapper = document.getElementById("content_wrapper");
  return window.innerHeight + window.scrollY > wrapper.scrollHeight * 0.7;
};

const renderHome = async () => {
  const dataFromServer = await reqDataServer(QTY_HOME);
  mixins.saveCharacters(dataFromServer.results);
  nextFigureId = mixins.renderPeoleFigures(
    QTY_HOME,
    "grid-container",
    previousLastId
  );
  setNewFiguresInfo(dataFromServer.results);
  addHomeListeners();
};

export { redirectToHome, renderHome };
