import { IUIJSONData } from "leafer-ui";
import DrawingBoard from "./DrawingBoard";

export interface IPluginProps {
    drawingBoard: DrawingBoard
}

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
    stroke?: string
    fill?: string
    fontSize?: number
}

export interface IAppProps {
    domId: string
    onChange?: (json: IUIJSONData) => void;
}