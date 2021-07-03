
const initState = {
  activeClass: {
      title: "",
      students: [],
      styling: { groups: 4, format: "groups", theme: "" },
      classSnapshot: {},
      count: 0,
  },
  classList:[],
  token:null,
  userId:null,
  isLoggedIn:false,
  inputClassName:'',
  inputNames:'',
}
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'INPUT_NAMES':
      return{
        ...state,
        inputNames: action.inputNames,
      }
    case 'INPUT_CLASS_NAME':
      return{
        ...state,
        inputClassName: action.inputClassName
      }
    case 'UPDATE_CLASS':
      return {
        ...state,
        activeClass: action.temp,
        classList: action.tempClassList,
      }
    case 'LOGIN':
      return {
        ...state,
        token:action.token,
        userId:action.userId,
        isLoggedIn:true
      }
    case 'LOGOUT':
      return{
        ...state,
        token:null,
        userId:null,
        isLoggedIn:false
      }
    default:
      break;
  }
  return state;
}

export default rootReducer
