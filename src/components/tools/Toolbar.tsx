import './Toolbar.scss';

import { toolBarOptions } from '../../utils/Tools'
import { ElIcon } from 'element-plus';
import App from '../../utils/App';
import { computed, defineComponent } from 'vue';

// const Toolbar = () => {

//   const getClass = computed(() => (idx: number) => {
//     if (!App.drawingBoardInstance) return '';

//     console.log('App.drawingBoardInstance?.tools', App.drawingBoardInstance);

//     return App.drawingBoardInstance?.tools?.toolbarActiveIndex?.value === idx ? 'active' : ''
//   })

//   const num = ref(333);

//   const clickHandler = (index: number) => {
//     App.drawingBoardInstance.tools.toolbarActiveIndex.value = index;

//     console.log("App.drawingBoardInstance.tools.toolbarActiveIndex.value", App.drawingBoardInstance.tools.toolbarActiveIndex.value);
//   }

//   return (
//     <section className="toolbar">
//       {
//         toolBarOptions.map((item, index) => {
//           return (
//             <div className={`toolbar-item ${getClass.value(index)}`} key={index} title={item.title} onClick={() => clickHandler(index)}>
//               <ElIcon>
//                 <item.icon />
//               </ElIcon>
//             </div>
//           )
//         })
//       }

//       <button onClick={() => {
//         num.value += 1;

//         console.log(num.value);
//       }}>
//         {num.value}
//       </button>
//     </section>
//   );
// };

// export default Toolbar;

export default defineComponent({
  name: 'Toolbar',
  setup() {
    const getClass = computed(() => (idx: number) => {
      if (!App.drawingBoardInstance) return '';

      return App.drawingBoardInstance?.tools?.toolbarActiveIndex.value === idx ? 'active' : ''
    })

    const clickHandler = (index: number) => {
      if (App.drawingBoardInstance?.tools?.toolbarActiveIndex.value === index) return;

      App.drawingBoardInstance.tools.toolbarActiveIndex.value = index;
    }

    return () => (
      <section className="toolbar">
        {
          toolBarOptions.map((item, index) => {
            return (
              <div className={`toolbar-item ${getClass.value(index)}`} key={index} title={item.title} onClick={() => clickHandler(index)}>
                <ElIcon>
                  <item.icon />
                </ElIcon>
              </div>
            )
          })
        }
      </section>
    )
  }
})