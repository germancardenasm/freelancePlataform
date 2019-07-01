import navBar from "../components/navBar.js";
import rootView from "../pages/rootView.js";
import homeView from "../pages/homeView.js";
import charactersView from "../pages/charactersView.js";
import detailView from "../pages/detailView.js";
import mixins from "./mixins.js";

const routes = {
  "/": rootView,
  "/home": homeView,
  "/characters": charactersView,
  "/detail": detailView
};

const router = async e => {
  const header = document.getElementById("header_container");
  const content = document.getElementById("content_wrapper");
  header.innerHTML = await navBar.render();
  await navBar.after_render();
  let parsedURL = mixins.parseRequestURL();

  // Get the page from the routes. If the  URL is not in our list select the home page instead
  let page = routes[parsedURL] ? routes[parsedURL] : homeView;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router, false);

// Listen on page load:
window.addEventListener("load", router, false);
