import { Ellipse, Line, Pen, Rect, Text } from "leafer-ui";
import Index from "../components/tools/index";
import { render, h, ref, Ref, nextTick } from "vue";
import { Arrow } from '@leafer-in/arrow'

import SELECT_TOOl_ICON from '../assets/xuanzegongju.svg'
import BRUSH_TOOl_ICON from '../assets/huabi.svg'
import ERASER_TOOl_ICON from '../assets/xiangpigongju.svg'
import RECT_TOOl_ICON from '../assets/huabigongju-juxing.svg'
import ELLIPSE_TOOl_ICON from '../assets/huabigongju-tuoyuan.svg'
import TEXT_TOOl_ICON from '../assets/huabigongju-wenben.svg'
import LINE_TOOl_ICON from '../assets/zhixiangongju.svg'
import ARROW_TOOl_ICON from '../assets/jiantougongju-hover.svg'

import LineSegmentSizePlugin from "../components/plugins/LineSegmentSizePlugin";

export const FILL = '#fff';
export const INITIAL_WIDTH = 0;
export const INITIAL_HEIGHT = 0;

export interface IToolBarItem {
  icon: string;
  name: string;
  title: string;
  notMove?: boolean;
  cursor?: string;
  isAfterRemove?: boolean;
  createdFactory?: (x: number, y: number) => any;
  menuPlugins?: Array<any>
  strokeWidth?: number
}

export const toolBarOptions: IToolBarItem[] = [
  {
    icon: SELECT_TOOl_ICON,
    name: 'selectTool',
    title: '选择'
  },
  {
    icon: BRUSH_TOOl_ICON,
    name: 'brushTool',
    title: '画笔',
    strokeWidth: 3,
    createdFactory(x: number, y: number) {
      const pen: Pen = new Pen({
        name: 'brushTool',
        x,
        y,
        editable: true
      });

      pen.setStyle({ stroke: 'rgba(0, 0, 0, 1)', strokeWidth: this.strokeWidth, strokeCap: 'round', strokeJoin: 'round' })
      return pen;
    },
    menuPlugins: [LineSegmentSizePlugin],
  },
  {
    icon: RECT_TOOl_ICON,
    name: 'rectTool',
    title: '矩形',
    createdFactory: (x: number, y: number) => new Rect({
      x,
      y,
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      strokeWidth: 2,
      stroke: 'rgba(0, 0, 0, 1)',
      editable: true,
      fill: FILL // 背景色
    })
  },
  {
    icon: ELLIPSE_TOOl_ICON,
    name: 'ellipseTool',
    title: '椭圆',
    createdFactory: (x: number, y: number) => new Ellipse({
      x,
      y,
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      strokeWidth: 2,
      stroke: 'rgba(0, 0, 0, 1)',
      innerRadius: 1,
      editable: true,
      fill: FILL // 背景色
    })
  },
  {
    icon: LINE_TOOl_ICON,
    name: 'lineTool',
    title: '线条',
    createdFactory: (x: number, y: number) => new Line({
      x,
      y,
      toPoint: { x: 0, y: 0 },
      strokeWidth: 3,
      stroke: 'rgba(0, 0, 0, 1)',
      editable: true,
    })
  },
  {
    icon: ARROW_TOOl_ICON,
    name: 'arrowTool',
    title: '箭头',
    createdFactory: (x: number, y: number) => new Arrow({
      x,
      y,
      toPoint: { x: 0, y: 0 },
      strokeWidth: 3,
      stroke: 'rgba(0, 0, 0, 1)',
      editable: true,
    })
  },
  {
    icon: TEXT_TOOl_ICON,
    name: 'textTool',
    title: '文本',
    notMove: true,
    cursor: 'text',
    createdFactory: (x: number, y: number) => new Text({
      x: x - 5,
      width: 200,
      height: 35,
      y: y - 10,
      text: '请双击编辑内容',
      fontSize: 24,
      fill: 'rgba(0, 0, 0, 1)',
      editable: true,
    }),
  },
  {
    icon: ERASER_TOOl_ICON,
    name: 'eraserTool',
    title: '橡皮擦',
    cursor: 'grabbing',
    isAfterRemove: true,
    createdFactory: (x: number, y: number) => new Line({
      x,
      y,
      toPoint: { x: 0, y: 0 },
      strokeWidth: 3,
      stroke: 'rgba(0, 0, 0, 1)',
      editable: true,
    })
  }
]

class Tools {
  public toolbarActiveIndex: Ref<number> = ref(0);
  constructor() {
    this.init();
  }

  private init() {
    const div = document.createElement('div');
    document.getElementById('app').append(div);

    nextTick(() => render(h(Index), div))
  }

  public getActiveGraphics() {
    return toolBarOptions[this.toolbarActiveIndex.value];
  }

}

export default Tools;
