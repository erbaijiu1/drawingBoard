import DrawingBoard from '../../utils/DrawingBoard'
import { ElRow, ElCol, ElSlider } from 'element-plus'

interface IProps {
    drawingBoard: DrawingBoard
}
const LineSegmentPlugin = ({ drawingBoard }: IProps) => {
    const graphics = drawingBoard.getSelectedGraphics()

    return (
        <ElRow>
            <ElCol span={24}>
                <p class="text">线段颜色</p>
            </ElCol>

            <ElCol span={24} >
                {/* <ElSlider
                    modelValue={graphics.value['stroke']}
                    onUpdate:modelValue={(val) => {
                        graphics.value['stroke'] = val
                    }}
                    max={20}
                    min={1}
                /> */}
            </ElCol>
        </ElRow >
    )
}

export default LineSegmentPlugin