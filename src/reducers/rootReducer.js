
const initState = {
  activeClass:[],
  classList:[]
}
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_CLASS':
      return {
        ...state,
        activeClass: action.temp,
        classList: action.tempClassList,
      }
      
    default:
      break;
  }
  return state;
}

export default rootReducer