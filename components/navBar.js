const navBar = {
  render: async () => {
    let view = `
      <nav id = "navbar" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand logo" href="#">
          <img src="./img/logo.png" class="d-inline-block align-top" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <a class="navbar-brand" href="#">Dev Freelancers</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link custom-link" href="/#/home"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link custom-link" href="/#/developers"
                >Desarroladores</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link custom-link" href="/#/detail">Detalle</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      `;
    return view;
  },
  after_render: async () => {}
};

export default navBar;
