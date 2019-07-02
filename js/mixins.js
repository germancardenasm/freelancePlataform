import config from "./config.js";
const API_URL = config.API_URL;

const mixins = {
  initStorage: function() {
    return new Promise((resolve, reject) => {
      if (this.storageIsInit()) return resolve();

      this.reqDataServer(API_URL).then(receivedData => {
        const apiConf = {
          QTY_HOME_CHARACTERS: 3,
          TOTAL_CHARACTERS: receivedData.info.count,
          TOTAL_PAGES: receivedData.info.pages,
          charactersUrl: API_URL,
          nextPage: receivedData.info.next,
          prevPage: receivedData.info.prev
        };
        const paginatorConfig = {
          activePaginatorPage: 1,
          previosActivePaginatorPage: 1
        };
        sessionStorage.setItem("apiConf", JSON.stringify(apiConf));
        sessionStorage.setItem(
          "paginatorConfig",
          JSON.stringify(paginatorConfig)
        );
        resolve();
      });
    });
  },

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
      const img = this.createImg("photo", "../img/dummyImg.png");
      const flag = this.createImg("flag", "../img/dummyFlag.png");
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

  createImg: function(classAsigned, src) {
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

  saveConfig: function(receivedData) {
    const apiConf = {
      QTY_HOME_CHARACTERS: 3,
      TOTAL_CHARACTERS: receivedData.count,
      TOTAL_PAGES: receivedData.pages,
      charactersUrl: API_URL,
      nextPage: receivedData.next,
      prevPage: receivedData.prev
    };
    sessionStorage.setItem("apiConf", JSON.stringify(apiConf));
  },

  /* renderPageWhendataAvailable: function(
    promise,
    section = "characters-container-page"
  ) {
    const container = this.getById(section);
    promise.then(receivedData => {
      const qtyOfCharactersReceived = receivedData.results.length;
      const qtyCharacterOnScreen = container.childElementCount;
      if (qtyCharacterOnScreen != qtyOfCharactersReceived) {
        this.removeAllCharacters(section);
        this.renderPeoleFigures(receivedData.results.length, section);
      }
      this.renderCharacters(receivedData.results, section);
      window.scrollTo(0, 0);
      this.saveCharacters(receivedData.results);
      if (receivedData.info) this.saveConfig(receivedData.info);
    });
  }, */

  removeAllCharacters: function(section = "home-page") {
    var myNode = this.getById(section);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  },

  renderCharacters: function(charactersArray, sectionContainer = "home-page") {
    charactersArray.forEach((element, index) => {
      const container = this.getById(sectionContainer).children[index];
      container.setAttribute("id", element.id);
      container.children[0].src = element.image;
      container.children[0].alt = element.name + " image";
      container.children[1].innerHTML = element.name;
    });
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
