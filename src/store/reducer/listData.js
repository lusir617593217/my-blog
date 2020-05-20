const listData = (state = [], action) => {
  switch (action.type) {
    case 'get_list_data':
     return action.listData

    default:
      return state
  }
}

export default listData
