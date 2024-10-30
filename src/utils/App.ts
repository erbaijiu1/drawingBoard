import DrawingBoard from "./DrawingBoard";

interface IAppProps {
    domId: string
}

class App {
    static drawingBoardInstance: null | DrawingBoard = null;

    static init = ({
        domId
    }: IAppProps) => {
        this.drawingBoardInstance = new DrawingBoard(domId);
    }
}

export default App