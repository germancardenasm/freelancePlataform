import { renderDetail } from "../js/detail.js";

const detail = {
  render: async () => {
    let view = `
          
          <div class="detail px-4" id="detail">
            <h1 class=" my-0 px-4 text-capitalize" id="name"></h1>
            <div class="detail-container container-fluid px-4 d-flex flex-row justify-content-center justify-content-sm-around flex-column flex-sm-row"> 
              <div id="photo-container"  class="photo-container my-4">
                <img id="photo" class="photo" src="../img/dummyImg.png" alt="" />
              </div>
              <div id="info-container" class="info-container my-sm-4">
                <table id="table-info" class="table-info text-capitalize"></table>
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
