import Toolbar from "../components/tools/Toolbar";
import { createApp } from "vue";

class Tools {
  constructor(rootDom: HTMLElement) {
    this.init(rootDom);
  }

  private init(rootDom: HTMLElement) {
    const toolbar = document.createElement("div");
    createApp(Toolbar).mount(toolbar);

    rootDom.append(toolbar)
  }
}

export default Tools;
