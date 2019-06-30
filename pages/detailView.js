/* 
import {} from '../../js/detail.js' */

const detail = {
  render: async () => {
    let view = `
          <div class="detail-page" id="detail-page">
            <div id='detail-page-title' class='page-title line-down'><h3 class='display-5'>Character Information</h3>
            </div>
            <div id="detail-container-page" class="detail-container-page">
              <div id="detail-character-container"  class="character-container">
                <img class="character-image detail" src="../img/dummyImg.png" alt="" />
                <div class="name-container d-none"></div>
              </div>
              <div id="character-info-container" class="character-info">
                <h4
                  id="character-name-detail"
                  class="character-name-detail px-1"
                ></h4>
                <table id="character-info-table" class="table"></table>
              </div>
            </div>
          </div>
        `;
    return view;
  },
  after_render: async () => {
    renderDetail();
  }
};

export default detail;
