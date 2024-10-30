import './ToolbarMenu.scss'

import { computed, defineComponent } from 'vue';
import App from '../../utils/App';
import { toolBarOptions } from '../../utils/Tools'


export default defineComponent({
    name: 'ToolbarMenu',
    setup() {
        const activeGraphics = computed(() => {
            if (App.drawingBoardInstance.tools.toolbarActiveIndex.value) {
                return toolBarOptions[App.drawingBoardInstance.tools.toolbarActiveIndex.value]
            } else if (App.drawingBoardInstance.selectedGraphics.value) {
                const result = toolBarOptions.find(v => {
                    return v.name === App.drawingBoardInstance.selectedGraphics.value.name
                })

                console.log('result', result);

                return result;
            }
        })

        console.log('activeGraphics', activeGraphics);

        return () => (
            <section className="toolbarMenu">
                {
                    activeGraphics.value?.menuPlugins?.map(menuPlugin => {
                        return (
                            <menuPlugin drawingBoard={App.drawingBoardInstance} />
                        )
                    })
                }
            </section >
        )
    }
})
