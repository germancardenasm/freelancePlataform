import { renderHome } from "../js/home.js";

const home = {
  render: async () => {
    let view = `
      <article>
        <h1 class="main-title">Top Developer Freelancers</h1>
        <blockquote class="blockquote px-5 mt-4  text-left">
            <p class="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.</p>
        </blockquote>
        <section class="grid-container">  
          <figure class='person-container' id="1">
              <img class="photo" src="../html/pic_trulli.jpg" alt="Trulli">
              <img class="flag" src="../html/pic_trulli.jpg" alt="Trulli">
              <figcaption>name of the person</figcaption>
          </figure>
        </section>
      </article>
      `;
    return view;
  },
  after_render: async () => {
    renderHome();
  }
};

export default home;
