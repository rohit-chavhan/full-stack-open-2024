const notiStyle = (color = 'green') => {
  return {
    border: `${color} 3px solid`,
    borderRadius: '10px',
    color: `${color}`,
    padding: '0px 10px',
  }
}

const Notify = ({ value }) => {
  if (value === null) return null
  console.log('value ==> ', value)

  if (typeof value === 'string') {
    return (
      <div style={notiStyle('red')}>
        <h2>{value}</h2>
      </div>
    )
  }

  let addBlogNotif = (
    <div style={notiStyle()}>
      <h2>{`${value.title} by ${value.author}`}</h2>
    </div>
  )
  return addBlogNotif
}

export default Notify
