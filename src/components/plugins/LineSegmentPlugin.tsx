import DrawingBoard from '@/utils/DrawingBoard'
import { ElRow, ElCol, ElSlider } from 'element-plus'

interface IProps {
    drawingBoard: DrawingBoard
}
const LineSegmentPlugin = ({ drawingBoard }: IProps) => {
    const graphics = drawingBoard.getSelectedGraphics()

    return (
        <ElRow>
            <ElCol span={24}>
                <p class="text">线段粗细</p>
            </ElCol>

            <ElCol span={24} >
                <ElSlider
                    modelValue={graphics.value['strokeWidth']}
                    onUpdate:modelValue={(val) => {
                        graphics.value['strokeWidth'] = val
                    }}
                    max={20}
                    min={1}
                />
            </ElCol >
        </ElRow >
    )
}

export default LineSegmentPlugin