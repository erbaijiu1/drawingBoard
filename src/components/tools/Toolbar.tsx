import './Toolbar.scss';
import { toolBarOptions } from '../../utils/Tools'
import { ElIcon } from 'element-plus';
const Toolbar = () => {
  return (
    <section className="toolbar">
      {
        toolBarOptions.map((item, index) => {
          return (
            <div className='tool' key={index} title={item.title}>
              <ElIcon>
                <item.icon />
              </ElIcon>
            </div>
          )
        })
      }
    </section>
  );
};

export default Toolbar;
