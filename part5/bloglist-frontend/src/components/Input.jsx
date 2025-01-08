const Input = ({ type = 'text', title, value, update }) => {
  return <input type={type} name={title} value={value} onChange={update} />
}

export default Input
