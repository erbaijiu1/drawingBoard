// import './index.scss'

import App from "../../utils/App"
import Toolbar from "./Toolbar"
import ToolbarMenu from "./ToolbarMenu"

const Index = () => {
    return (
        <div className="toolsIndex">
            <Toolbar />

            {
                App.drawingBoardInstance?.tools?.toolbarActiveIndex ? <ToolbarMenu /> : <span></span>
            }
        </div>
    )
}

export default Index