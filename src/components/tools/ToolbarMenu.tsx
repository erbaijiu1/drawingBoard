import './ToolbarMenu.scss'

import { computed, defineComponent, ref } from 'vue';
import App from '../../utils/App';
import { toolBarOptions } from '../../utils/Tools'
import LayerOptions from '../plugins/LayerOptions'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'; // 使用正确的图标名称
import { ElIcon } from 'element-plus'; // 导入 ElIcon 组件

// 定义图标组件
const DownIcon = () => <ArrowDown />;
const UpIcon = () => <ArrowUp />;

export default defineComponent({
    name: 'ToolbarMenu',
    setup() {
        const isHidden = ref(false); // 添加一个状态来控制隐藏

        const activeGraphics = computed(() => {
            if (App.drawingBoardInstance.tools.toolbarActiveIndex.value) {
                return toolBarOptions[App.drawingBoardInstance.tools.toolbarActiveIndex.value]
            } else if (App.drawingBoardInstance.selectedGraphics.value) {
                return toolBarOptions.find(v => {
                    return v.name === App.drawingBoardInstance.selectedGraphics.value.name
                })
            }
        })

        // const changeGraphicsZIndex = (type: string) => {
        //     const graphics = App.drawingBoardInstance.getSelectedGraphics();

        //     graphics
        // }
        const toggleVisibility = () => {
            isHidden.value = !isHidden.value; // 切换隐藏状态
        };

        return () => (
            <div>

                {
                    activeGraphics.value?.menuPlugins?.length ? < section className="toolbarMenu" style={{ width: isHidden.value ? '5px' : '200px' }}>
                        <view onClick={toggleVisibility} class="toggle-button">
                            <ElIcon>
                                {isHidden.value ? <DownIcon /> : <UpIcon />} {/* 使用图标 */}
                            </ElIcon>
                        </view>
                        
                        {
                            isHidden.value ? null : activeGraphics.value?.menuPlugins?.map(menuPlugin => {
                                return (
                                    <div className="toolbarMenuOption">
                                        <menuPlugin drawingBoard={App.drawingBoardInstance} />
                                    </div>
                                )
                            })
                        }

                        {
                            isHidden.value ? null : <LayerOptions drawingBoard={App.drawingBoardInstance} />
                        }

                        {/* <div className="toolbarMenuLayer">
                            {
                                LAYER_LIST.map(Layer => {
                                    return (
                                        <span title={Layer.title} onClick={() => changeGraphicsZIndex(Layer.type)} key={Layer.type}>
                                            <ElIcon>
                                                <Layer.icon />
                                            </ElIcon>
                                        </span>
                                    )
                                })
                            }
                        </div> */}
                    </section > : null
                }
            </div>
        )
    }
})
