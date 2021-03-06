import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  console.log(message.type)

  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style}>{message.message}</div>
}

export default Notification
