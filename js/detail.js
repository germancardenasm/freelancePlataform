import mixins from "./mixins.js";
import modal from "../pages/modal.js";
import config from "./config.js";

const redirectToDetail = e => {
  location.hash = "/detail";
};

const showModalDetail = e => {
  let personIdtoShowDetail = 0;
  if (!isPersonContainer(e)) return console.log("nop");
  personIdtoShowDetail = getPersonId(e);
  sessionStorage.setItem("idToShowDetail", personIdtoShowDetail);
  console.log("Person Id: ", personIdtoShowDetail);
  renderDetailModal();
};

const isPersonContainer = e => {
  const isIt =
    e.target.parentElement.classList.contains("person-container") ||
    e.target.classList.contains("person-container");
  console.log("is it a container: ", isIt);
  return isIt;
};

const getPersonId = e => {
  if (e.target.classList.contains("person-container"))
    return parseInt(e.target.id);
  else return parseInt(e.target.parentElement.id);
};

async function renderDetailModal() {
  //setActiveLink("none");
  const modal_wrapper = mixins.getById("detail_wrapper");
  const personIdtoShowDetail = await parseInt(
    sessionStorage.getItem("idToShowDetail")
  );
  console.log("Person Id to show detail: ", personIdtoShowDetail);
  let personList = await JSON.parse(sessionStorage.getItem("charactersObject"));
  let person = personList[personIdtoShowDetail];
  positionFigureVerticalyCentered(personIdtoShowDetail);
  modal_wrapper.innerHTML = modal(person);

  setTimeout(() => {
    const navbar = mixins.getById("navbar");
    const article = mixins.getById("home");
    navbar.classList.add("opacity-none");
    article.classList.add("blur");
    setModalTable(person);
    $("#detail_modal").modal("show");
    addModalEventListener();
  }, 500);

  //renderCharacters(characterToRender, "detail-container-page");
}

const addModalEventListener = () => {
  /* const moreDetailButton = mixins.getById("more_detail");
  moreDetailButton.addEventListener("clic", redirectToDetail); */
  $("#detail_modal").on("hidden.bs.modal", function(e) {
    const navbar = mixins.getById("navbar");
    const article = mixins.getById("home");
    navbar.classList.remove("opacity-none");
    article.classList.remove("blur");
  });
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

export { showModalDetail, redirectToDetail };
