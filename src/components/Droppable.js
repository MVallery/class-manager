import React from 'react';
import {useDroppable} from '@dnd-kit/core';
const Droppable = (props)=> {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={setNodeRef}>
      {props.children}
    </div>
  );
}
// function Droppable(props) {
//   const {isOver, setNodeRef} = useDroppable({
//     id: 'droppable',
//   });
//   const style = {
//     color: isOver ? 'green' : undefined,
//   };
  
  
//   return (
//     <div ref={setNodeRef} style={style}>
//       {props.children}
//     </div>
//   );
// }

export default Droppable