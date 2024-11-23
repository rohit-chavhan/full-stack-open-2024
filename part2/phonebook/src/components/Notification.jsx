const getStyle = (color) => {
  return {
    fontSize: 25,
    padding: 10,
    border: `3px solid ${color}`,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    color: color,
    marginBottom: 15,
  };
};

const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  let notiStyle = getStyle('green');
  if (msg.includes('removed from server')) {
    notiStyle = getStyle('red');
  }

  return (
    <div style={notiStyle}>
      <em>{msg}</em>
    </div>
  );
};

export default Notification;
