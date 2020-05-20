const routerValue = (state = [], action) => {
  switch (action.type) {
    case 'router_value':
      return action.routerValue

    default:
      return state
  }
}

export default routerValue
