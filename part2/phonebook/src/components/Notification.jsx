const getStyle = (color) => {
  return {
    fontSize: 25,
    padding: 10,
    border: `3px solid ${color}`,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    color: color,
    marginBottom: 15,
  }
}

const Notification = ({ msg, color }) => {
  color = color === 'green' ? getStyle('green') : getStyle('red')

  return (
    <div style={color}>
      <em>{msg}</em>
    </div>
  )
}

export default Notification
