import config from "./config.js";
import mixins from "./mixins.js";
import modal from "../pages/modal.js";
import { redirectToDetail } from "./detail.js";

const API_URL = config.API_URL;
const QTY_HOME = config.QTY_HOME;
let previousLastId = 0;
let nextFigureId = 0;
let isLoadingMorePeople = false;
let preventScrollListener = false;

const redirectToHome = () => {
  location.hash = "/home";
};

const renderHome = async () => {
  previousLastId = 0;
  preventScrollListener = false;
  sessionStorage.setItem("idToShowDetail", 0);
  sessionStorage.setItem("personToShowDetail", JSON.stringify({}));
  sessionStorage.setItem("personCountry", JSON.stringify({}));
  const dataFromServer = await reqDataServer(QTY_HOME);
  mixins.saveCharacters(dataFromServer.results);
  nextFigureId = mixins.renderPeoleFigures(
    QTY_HOME,
    "grid-container",
    previousLastId
  );
  setNewFiguresInfo(dataFromServer.results);
  addHomeListeners();
  mixins.setActiveLink("home-link");
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

const showModalDetail = e => {
  let personIdtoShowDetail = 0;
  if (!isPersonContainer(e)) return console.log("nop");
  personIdtoShowDetail = getPersonId(e);
  sessionStorage.setItem("idToShowDetail", personIdtoShowDetail);
  renderDetailModal();
};

const isPersonContainer = e => {
  const isIt =
    e.target.parentElement.classList.contains("person-container") ||
    e.target.classList.contains("person-container");
  return isIt;
};

const getPersonId = e => {
  if (e.target.classList.contains("person-container"))
    return parseInt(e.target.id);
  else return parseInt(e.target.parentElement.id);
};

const renderDetailModal = async () => {
  window.removeEventListener("scroll", loadMorePersons);
  const modal_wrapper = mixins.getById("detail_wrapper");
  const personIdtoShowDetail = await parseInt(
    sessionStorage.getItem("idToShowDetail")
  );
  let personList = await JSON.parse(sessionStorage.getItem("charactersObject"));
  let person = personList[personIdtoShowDetail];
  sessionStorage.setItem("personToShowDetail", JSON.stringify(person));
  positionFigureVerticalyCentered(personIdtoShowDetail);
  modal_wrapper.innerHTML = modal(person);
  setModalTable(person);
  blur("set");
  setTimeout(() => {
    $("#detail_modal").modal("show");
    addModalEventListener();
  }, 100);
};

const addModalEventListener = () => {
  const moreDetailButton = mixins.getById("more_detail");
  moreDetailButton.addEventListener("click", prepareRedirectionToDetail);
  $("#detail_modal").on("hidden.bs.modal", function(e) {
    if (!preventScrollListener) {
      blur("remove");
      window.addEventListener("scroll", loadMorePersons);
    }
  });
};

const prepareRedirectionToDetail = () => {
  preventScrollListener = true;
  redirectToDetail();
};

const blur = option => {
  const navbar = mixins.getById("navbar");
  const article = mixins.getById("home");
  if (option === "add") {
    navbar.classList.add("opacity-none");
    article.classList.add("blur");
  } else if (option === "remove") {
    navbar.classList.remove("opacity-none");
    article.classList.remove("blur");
  }
};

const positionFigureVerticalyCentered = id => {
  const figure = mixins.getById(id);
  let viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let figureRectangle = figure.getBoundingClientRect();
  let destinationPoint = viewPortHeight / 2 - figureRectangle.height / 2;
  let distance = figureRectangle.y - destinationPoint;
  window.scrollBy({
    top: distance,
    left: 0,
    behavior: "smooth"
  });
};

const setModalTable = async person => {
  const table = mixins.getById("person-info-table");
  const country = await mixins.reqDataServer(config.COUNTRY_URL, person.nat);
  sessionStorage.setItem("personCountry", JSON.stringify(country));
  const labels = {
    gender: person.gender,
    age: person.dob.age,
    city: person.location.city,
    country: country.name
  };

  Object.keys(labels).forEach((element, index) => {
    let row = table.insertRow(index);
    let cellLabel = row.insertCell(0);
    cellLabel.classList.add("table-label");
    let cellCharacterInfo = row.insertCell(1);
    cellCharacterInfo.classList.add("info");
    cellLabel.innerHTML = element + " :";
    cellCharacterInfo.innerHTML = labels[element];
  });
};

export { redirectToHome, renderHome };
