function modal(person) {
  return `<div class="modal fade" id="detail_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">
        ${person.name.first} ${person.name.last}
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal_images">
          <img class='modal-photo' src=${
            person.picture.large
          } alt="" class="photo">
          <img class='modal-flag' src='https://www.countryflags.io/NO/shiny/64.png' alt="" class="photo">
        </div>
        <table id="person-info-table" class="table"></table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">More Detail</button>
      </div>
    </div>
  </div>
</div>`;
}

export default modal;
