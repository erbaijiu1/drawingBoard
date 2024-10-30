import "@leafer-in/editor";
import '@leafer-in/text-editor'
import Tools, { INITIAL_HEIGHT, INITIAL_WIDTH } from "./Tools";

import { App, DragEvent, ICursorType, ILeaf, Text } from "leafer-ui";
import { Ref, ref, toRef, watch } from "vue";
import { EditorEvent } from "@leafer-in/editor";

class DrawingBoard {
  private leaferInstance: null | App = null;
  private rootDom: null | HTMLElement = null;
  private clearGraphicsQueue = new Map<ILeaf, ILeaf>();

  public tools: null | Tools = null;
  public selectedGraphics: Ref<null | any> = ref(null);

  constructor(domId: string) {
    this.rootDom = document.getElementById(domId);

    if (!this.rootDom) {
      console.warn("未找到挂载元素！");
      return;
    }

    this.leaferInstance = this.initApp(this.rootDom);
    this.tools = new Tools();
    this.initEvent(this.leaferInstance);

    watch(() =>
      this.tools.toolbarActiveIndex.value,
      (newValue) => {
        this.setEditorState(!newValue)
        this.setCursor();
      }
    )
  }

  private initApp = (view: HTMLElement) => {
    const app = new App({
      view,
      editor: {},
    });

    return app;
  };

  private initEvent = (app: App) => {
    app.on(DragEvent.DOWN, this.mousedown)
    app.on(DragEvent.DRAG, this.mousemove)
    app.on(DragEvent.UP, this.mouseup)
    app.editor.on(EditorEvent.SELECT, this.graphicSelected)


  }

  private mousedown = (e: DragEvent) => this.aop(null, () => {
    const { x, y } = e.getPage();

    const graphics = this.tools.getActiveGraphics();

    const graph = graphics.createdFactory!(x - INITIAL_WIDTH, y - INITIAL_HEIGHT)

    this.selectedGraphics.value = graph;
    this.leaferInstance.tree.add(graph);
  })

  private mousemove = (e: DragEvent) => this.aop(null, () => {
    if (!this.selectedGraphics.value) return;

    const graphics = this.tools.getActiveGraphics();

    // 不需要移动
    if (graphics.notMove) return;

    const { x, y } = this.selectedGraphics.value;

    if (!x || !y) return;

    const { x: offsetX, y: offsetY } = e.getPage();
    const [width, height] = [offsetX - (x), offsetY - (y)];

    // 可优化
    if (graphics.name === 'eraserTool') {
      const { target } = this.leaferInstance.pick({ x: e.x, y: e.y }, {
        hitRadius: 2
      })!;

      if (!target) return;

      const has = this.clearGraphicsQueue.has(target);

      if (has) return;

      this.clearGraphicsQueue.set(target, target);
      target.opacity = 0.5;
    } else if (this.selectedGraphics.value.tag === 'Line' || this.selectedGraphics.value.tag === 'Arrow') {
      this.selectedGraphics.value.toPoint = { x: width, y: height };
    } else if (this.selectedGraphics.value.tag === 'Pen') {
      this.selectedGraphics.value.lineTo(width, height);
    } else {
      const scaleX = width < 0 ? -1 : 1, scaleY = height < 0 ? -1 : 1;

      this.selectedGraphics.value.scaleX = scaleX;
      this.selectedGraphics.value.scaleY = scaleY;
      this.selectedGraphics.value.width = Math.abs(width);
      this.selectedGraphics.value.height = Math.abs(height);
    }
  })

  private mouseup = () => {
    if (this.tools.getActiveGraphics().isAfterRemove) {
      this.selectedGraphics.value.remove();
    }

    this.clearGraphicsQueue.forEach(graphics => {
      graphics.remove();
      this.clearGraphicsQueue.delete(graphics);
    })

    this.tools.toolbarActiveIndex.value = 0;
    this.selectedGraphics.value = null;

    // const isSave = this.history.save(this.leafer.value!.tree.toJSON()!);
    // isSave && this.onChange(this.leafer.value!.tree.toJSON()!);
  }

  private aop = (beforeHandler, afterHandler) => {
    beforeHandler && beforeHandler();

    if (!this.tools.toolbarActiveIndex.value) return;

    afterHandler && afterHandler();
  }

  public setEditorState = (state: boolean) => {
    this.leaferInstance.editor.cancel()
    this.leaferInstance.editor.hittable = state
    this.leaferInstance.editor.visible = state
  }

  private graphicSelected = ({ value, oldValue }: any) => {
    console.log('value', value);
    
    if (!value || !value?.tag) return this.selectedGraphics.value = null;

    if (value.tag === 'Pen') {
      value.children[0].name = this.selectedGraphics.value.name;
      this.selectedGraphics.value = value.children[0];
    } else {
      this.selectedGraphics.value = value;
    }

    // value.zIndex = this.#activeZIndex;
    // this.#activeZIndex++;
  }

  public setCursor = () => {
    const cursor = (this.tools.getActiveGraphics().cursor || 'crosshair') as ICursorType;
    this.leaferInstance.cursor = this.tools.toolbarActiveIndex.value ? cursor : 'auto';
  }

  public getSelectedGraphics = () => {
    return toRef(
      this.selectedGraphics.value ? this.selectedGraphics.value : this.tools.getActiveGraphics()
    );
  }
}

export default DrawingBoard;
