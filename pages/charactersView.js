/* import {renderCharactersPage} from '../../js/characters.js'
 */
const characters = {
  render: async () => {
    let view = `
          <div class="characters-page" id='characters-page'>
              <div id='characters-page-title' class='page-title line-down'><h3 class='display-5'>Characters</h3>
              </div>
              <div class="characters-container-page d-flex justify-content-center" id='characters-container-page'>
              </div>
              <nav id='pagination' class='paginator px-3'>
                  <ul id='paginator-list' class="pagination d-flex flex-wrap justify-content-between">
                      <li id='previous' class="page-item disable"><a class="page-link" href="#">Previous</a></li>
                      <li id='next' class="page-item "><a class="page-link" href="#" aria-disabled="true">Next</a></li>
                  </ul>
              </nav>
          </div>
      `;
    return view;
  },
  after_render: async () => {
    renderCharactersPage();
  }
};

export default characters;
