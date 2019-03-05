const initialState = ""

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      const newState = action.data.filter
      return newState
    default:
      return state
  }
}

export const createFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: { filter: filter }
  }
}

export default filterReducer