import { redirectToHome } from "../../js/home.js";
const rootView = {
  render: async () => {
    let view = `
      `;
    return view;
  },
  after_render: async () => {
    redirectToHome();
  }
};

export default rootView;
