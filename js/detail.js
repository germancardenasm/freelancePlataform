import mixins from "./mixins.js";

const redirectToDetail = e => {
  if (!e.target.parentElement.classList.contains("character-container")) return;
  const characterIdtoShowDetail = parseInt(e.target.parentElement.id);
  sessionStorage.setItem("idToShowDetail", characterIdtoShowDetail);
  location.hash = "/detail";
};

async function renderDetail() {
  setActiveLink("none");
  const characterIdtoShowDetail = await parseInt(
    sessionStorage.getItem("idToShowDetail")
  );
  let charactersList = await JSON.parse(
    sessionStorage.getItem("charactersObject")
  );
  let characterToRender = charactersList.filter(
    character => character.id == characterIdtoShowDetail
  );
  renderCharacters(characterToRender, "detail-container-page");
  renderCharacterDetail(characterToRender[0]);
}

const renderCharacterDetail = characterInfo => {
  const table = getById("character-info-table");
  const labels = ["status", "species", "gender", "origin"];
  const characterName = getById("character-name-detail");
  characterName.innerHTML = characterInfo.name;
  labels.forEach((element, index) => {
    let row = table.insertRow(index);
    let cellLabel = row.insertCell(0);
    cellLabel.classList.add("table-label");
    let cellCharacterInfo = row.insertCell(1);
    cellLabel.innerHTML = element.toUpperCase() + " :";
    if (element != "origin")
      cellCharacterInfo.innerHTML = characterInfo[element].toUpperCase();
    else
      cellCharacterInfo.innerHTML = characterInfo[element].name.toUpperCase();
  });
};

export { redirectToDetail, renderDetail };
