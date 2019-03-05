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

export const createNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification: notification }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

export default notificationReducer