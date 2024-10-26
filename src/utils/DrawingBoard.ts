import "@leafer-in/editor";
import Tools from "./Tools";

import { App, Rect } from "leafer-ui";

class DrawingBoard {
  private leaferInstance: null | App = null;
  private rootDom: null | HTMLElement = null;

  constructor(domId: string) {
    this.rootDom = document.getElementById(domId);

    if (!this.rootDom) {
      console.warn("未找到挂载元素！");
      return;
    }

    this.leaferInstance = this.initApp(this.rootDom);
    new Tools(this.rootDom);

    this.test();
  }

  private initApp = (view: HTMLElement) => {
    const app = new App({
      view,
      editor: {},
    });

    return app;
  };

  private test = () => {
    if (!this.leaferInstance) return;

    this.leaferInstance.tree.add(
      Rect.one(
        { editable: true, fill: "#FEB027", cornerRadius: [20, 0, 0, 20] },
        100,
        100
      )
    );
    this.leaferInstance.tree.add(
      Rect.one(
        { editable: true, fill: "#FFE04B", cornerRadius: [0, 20, 20, 0] },
        300,
        100
      )
    );
  };
}

export default DrawingBoard;
