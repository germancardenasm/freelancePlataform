import config from "./config.js";
const API_URL = config.API_URL;

const mixins = {
  reqDataServer: function(url, characterId = "") {
    return fetch(url + characterId)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        return response;
      });
  },

  renderPeoleFigures: function(
    qtyOfCharacters,
    sectionContainer,
    lastFigureId
  ) {
    const page = this.getById(sectionContainer);
    for (let i = 0; i < qtyOfCharacters; i++) {
      const container = document.createElement("figure");
      container.setAttribute("id", i + lastFigureId);
      container.classList.add("person-container");
      const img = this.createImgTag("photo", "../img/dummyImg.png");
      const flag = this.createImgTag("flag", "../img/dummyFlag.png");
      flag.src = "../img/dummyflag.png";
      flag.alt = "dummy image";
      flag.classList.add("flag");
      container.appendChild(img);
      container.appendChild(flag);
      const name = document.createElement("figcaption");
      name.innerHTML = "Lorem ipsum";
      name.classList.add("name");
      container.append(name);
      page.appendChild(container);
    }
    return parseInt(page.lastChild.id) + 1;
  },

  createImgTag: function(classAsigned, src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.classList.add(classAsigned);
    return img;
  },

  getById: function(id) {
    return document.getElementById(id);
  },

  saveCharacters: function(serverInfo = {}) {
    sessionStorage.setItem("charactersObject", JSON.stringify(serverInfo));
  },

  removeAllCharacters: function(section = "home-page") {
    var myNode = this.getById(section);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  },

  setActiveLink: function(link) {
    let linksUl = this.getById("nav-links");
    for (let i = 0; i < linksUl.childElementCount; i++) {
      linksUl.children[i].classList.remove("active");
    }
    if (link != "none") this.getById(link).classList.add("active");
  },

  getStorageItems: function(data) {
    return JSON.parse(sessionStorage.getItem(data));
  },

  storageIsInit: function() {
    return this.getStorageItems("apiConf");
  },

  parseRequestURL: function() {
    let url =
      location.hash
        .slice(1)
        .toLowerCase()
        .toLowerCase() || "/";
    return url;
  }
};

export default mixins;
