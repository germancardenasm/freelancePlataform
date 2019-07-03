import mixins from "./mixins.js";
import modal from "../pages/modal.js";
import config from "./config.js";

const redirectToDetail = e => {
  e.preventDefault();
  location.hash = "/detail";
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
  console.log("is it a container: ", isIt);
  return isIt;
};

const getPersonId = e => {
  if (e.target.classList.contains("person-container"))
    return parseInt(e.target.id);
  else return parseInt(e.target.parentElement.id);
};

const renderDetailModal = async () => {
  const modal_wrapper = mixins.getById("detail_wrapper");
  const personIdtoShowDetail = await parseInt(
    sessionStorage.getItem("idToShowDetail")
  );
  console.log("Person Id to show detail: ", personIdtoShowDetail);
  let personList = await JSON.parse(sessionStorage.getItem("charactersObject"));
  let person = personList[personIdtoShowDetail];
  sessionStorage.setItem("personToShowDetail", JSON.stringify(person));
  positionFigureVerticalyCentered(personIdtoShowDetail);
  modal_wrapper.innerHTML = modal(person);
  setModalTable(person);
  const navbar = mixins.getById("navbar");
  const article = mixins.getById("home");
  navbar.classList.add("opacity-none");
  article.classList.add("blur");
  setTimeout(() => {
    $("#detail_modal").modal("show");
    addModalEventListener();
  }, 100);
};

const addModalEventListener = () => {
  const moreDetailButton = mixins.getById("more_detail");
  moreDetailButton.addEventListener("click", redirectToDetail);
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

async function renderDetail() {
  //setActiveLink("none");
  const personToShowDetail = await JSON.parse(
    sessionStorage.getItem("personToShowDetail")
  );
  renderPersonDetail(personToShowDetail);
}

const renderPersonDetail = person => {
  const table = mixins.getById("table-info");
  const characterName = mixins.getById("name");
  const photo = mixins.getById("photo");
  const country = JSON.parse(sessionStorage.getItem("personCountry"));
  const labels = {
    name: person.name.first + " " + person.name.last,
    age: person.dob.age,
    email: person.email,
    phone: person.phone,
    cellphone: person.cell,
    addres: person.location.street,
    zipCode: person.location.postcode,
    city: person.location.city,
    country: country.name
  };
  photo.src = person.picture.large;
  characterName.innerHTML = labels.name;
  Object.keys(labels).forEach((element, index) => {
    let row = table.insertRow(index);
    let cellLabel = row.insertCell(0);
    cellLabel.classList.add("table-label");
    let cellCharacterInfo = row.insertCell(1);
    cellCharacterInfo.classList.add("info");
    cellLabel.innerHTML = element + ":  ";
    cellCharacterInfo.innerHTML = labels[element];
  });
};

export { showModalDetail, renderDetail, redirectToDetail };
