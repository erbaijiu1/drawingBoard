import App from "../../utils/App"
import Toolbar from "./Toolbar"
import ToolbarMenu from "./ToolbarMenu"
import Menu from "./Menu"
import Tips from "./Tips"

const Index = () => {
    return (
        <div className="toolsIndex">
            <Toolbar />

            {
                App.drawingBoardInstance?.tools?.toolbarActiveIndex ? <ToolbarMenu /> : null
            }

            <Menu />
            <Tips content="随心画板" />
        </div>
    )
}

export default Index