import mixins from "./mixins.js";

import config from "./config.js";

const redirectToDetail = e => {
  location.hash = "/detail";
};

async function renderDetail() {
  mixins.setActiveLink("detail-link");
  const personToShowDetail = await JSON.parse(
    sessionStorage.getItem("personToShowDetail")
  );
  renderPersonDetail(personToShowDetail);
}

const renderPersonDetail = person => {
  const table = mixins.getById("table-info");
  const photo = mixins.getById("photo");
  const country = JSON.parse(sessionStorage.getItem("personCountry"));
  const labels = {
    name: person.name.first + " " + person.name.last,
    age: person.dob.age,
    email: person.email,
    phone: person.phone,
    cell: person.cell,
    addres: person.location.street,
    zip: person.location.postcode,
    city: person.location.city,
    country: country.name
  };
  photo.src = person.picture.large;
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

export { renderDetail, redirectToDetail };
