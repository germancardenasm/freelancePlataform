import { renderHome } from "../js/home.js";

const home = {
  render: async () => {
    let view = `
      <article>
        <h1 class="main-title">Top Developer Freelancers</h1>
        <blockquote class="blockquote px-1 mt-4  text-left">
            <p class="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. </p>
        </blockquote>
        <section id="grid-container" class="grid-container">  
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
