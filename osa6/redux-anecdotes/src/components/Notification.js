import React from 'react'
import { createNotification, resetNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
    {props.store.getState().notifications}
    </div>
  )
}

export default Notification
