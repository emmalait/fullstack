const initialState = ""

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
    console.log(action)
      const newState = action.data.notification
      return newState
    case 'RESET_NOTIFICATION':
      return ""
    default:
      return state
  }
}

export const setNotification = (notification, duration) => {
  
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, duration * 1000)
  }
}

export default notificationReducer