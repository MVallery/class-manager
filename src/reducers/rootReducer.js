
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
  isLoggedIn:false
}
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_CLASS':
      return {
        ...state,
        activeClass: action.temp,
        classList: action.tempClassList,
      }
    case 'LOGIN':
      console.log('is this workingwhwwwwatt')
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
