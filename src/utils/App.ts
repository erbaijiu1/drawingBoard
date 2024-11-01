import DrawingBoard from "./DrawingBoard";
import { IAppProps } from "./types";

class App {
    static drawingBoardInstance: null | DrawingBoard = null;

    static init = ({
        domId,
        onChange
    }: IAppProps) => {
        this.drawingBoardInstance = new DrawingBoard({
            domId,
            onChange
        });
    }

    static destroy() {
        this.drawingBoardInstance && this.drawingBoardInstance.destroy();
    }
}

export default App