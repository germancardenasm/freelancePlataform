import { renderDetail } from "../js/detail.js";

const detail = {
  render: async () => {
    let view = `
          
          <div class="detail px-3" id="detail">
            <div class="detail-header p-2 p-sm-4 d-flex justify-content-between align-items-center">
              <a class="detail-logo" href="/#/home">
                <img src="./img/logo.png" class="d-inline-block align-top" alt="" />
              </a>
              <h2 class=" my-0 pr-1 text-capitalize" id="name">Flobant</h1>
            </div>
            <div class="detail-container container-fluid px-0 d-flex flex-row justify-content-center justify-content-sm-around flex-column flex-sm-row"> 
              <div id="photo-container"  class="photo-container my-4">
                <img id="photo" class="photo" src="../img/dummyImg.png" alt="" />
              </div>
              <div id="info-container" class="info-container ml-2 my-sm-4">
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
