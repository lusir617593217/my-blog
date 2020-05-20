
const collapsedReducer = (state = false, action) => {
  switch (action.type) {
    case 'change_collapsed':
      return action.collapsed
    default:
      return state
  }
}

export default collapsedReducer
